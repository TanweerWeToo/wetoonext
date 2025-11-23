import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { query } from '@/lib/db';
import { sendEmail, generateResumePaymentLink } from '@/lib/emailConfig';
import { fomoEmailTemplate } from '@/lib/emailTemplates';

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Helper function to send FOMO email after delay
const scheduleFomoEmail = async (applicationId) => {
  // Wait 10 minutes before checking if payment was completed
  setTimeout(async () => {
    try {
      // Check if payment is still pending
      const applications = await query(
        'SELECT * FROM applications WHERE id = ? AND payment_status = ?',
        [applicationId, 'PENDING_PAYMENT']
      );

      if (applications.length > 0 && !applications[0].fomo_email_sent) {
        const app = applications[0];
        const resumeLink = generateResumePaymentLink(applicationId);
        const amount = '2999'; // ₹2999

        const emailData = fomoEmailTemplate({
          fullName: app.full_name,
          courseName: app.course_name,
          resumePaymentLink: resumeLink,
          amount: amount,
        });

        const emailResult = await sendEmail({
          to: app.email,
          subject: emailData.subject,
          html: emailData.html,
          text: emailData.text,
        });

        if (emailResult.success) {
          // Mark FOMO email as sent
          await query(
            'UPDATE applications SET fomo_email_sent = 1 WHERE id = ?',
            [applicationId]
          );
          console.log(`FOMO email sent to ${app.email}`);
        }
      }
    } catch (error) {
      console.error('FOMO email scheduling error:', error);
    }
  }, 10 * 60 * 1000); // 10 minutes delay
};

export async function POST(request) {
  try {
    const { applicationId } = await request.json();

    if (!applicationId) {
      return NextResponse.json(
        { success: false, message: 'Application ID is required' },
        { status: 400 }
      );
    }

    // Fetch application details
    const applications = await query(
      'SELECT * FROM applications WHERE id = ?',
      [applicationId]
    );

    if (applications.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Application not found' },
        { status: 404 }
      );
    }

    // Fixed application fee (in paise - ₹2999 = 299900 paise)
    const amount = 100; // ₹2999
    const currency = 'INR';

    // Create Razorpay order
    const options = {
      amount: amount,
      currency: currency,
      receipt: `app_${applicationId}_${Date.now()}`,
      notes: {
        applicationId: applicationId,
        purpose: 'Course Application Fee',
      },
    };

    const order = await razorpay.orders.create(options);

    // Calculate payment link expiry (48 hours from now)
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 48);

    // Update application with Razorpay order ID and payment status
    await query(
      `UPDATE applications 
       SET razorpay_order_id = ?, 
           payment_status = 'PENDING_PAYMENT',
           payment_link_expires_at = ?,
           updated_at = NOW()
       WHERE id = ?`,
      [order.id, expiryDate, applicationId]
    );

    // Schedule FOMO email (will send after 10 minutes if payment not completed)
    scheduleFomoEmail(applicationId);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create payment order' },
      { status: 500 }
    );
  }
}

