import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { query } from '@/lib/db';
import { sendEmail, generateResumePaymentLink } from '@/lib/emailConfig';
import { fomoEmailTemplate } from '@/lib/emailTemplates';

// Helper function to initialize Razorpay instance lazily
const getRazorpay = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay API keys (RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET) are missing from your environment variables.');
  }
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

// Helper function to send FOMO email
// Note: In serverless environments, we send immediately instead of using setTimeout
// For delayed emails (10 minutes), use a cron job to call /api/payment/send-fomo-emails
const sendFomoEmail = async (applicationId) => {
  try {
    // Check if payment is still pending
    const applications = await query(
      'SELECT * FROM applications WHERE id = ? AND payment_status = ?',
      [applicationId, 'pending']
    );

    if (applications.length > 0 && !applications[0].fomo_email_sent) {
      const app = applications[0];
      const resumeLink = generateResumePaymentLink(applicationId);
      
      const isRcam = app.course_name.toLowerCase().includes("rca") || app.course_name.toLowerCase().includes("jamia");
      const targetCategory = isRcam ? "rca" : "upsc";
      const matchedCourses = await query('SELECT fee FROM courses WHERE category = ? AND is_active = 1 LIMIT 1', [targetCategory]);
      const amount = matchedCourses.length > 0 ? matchedCourses[0].fee : '2999';

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
        return { success: true };
      }
    }
    return { success: false, reason: 'Payment completed or email already sent' };
  } catch (error) {
    console.error('FOMO email error:', error);
    return { success: false, error: error.message };
  }
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

    // Fetch course fee dynamically from database
    const isRca = app.course_name.toLowerCase().includes("rca") || app.course_name.toLowerCase().includes("jamia");
    const targetCategory = isRca ? "rca" : "upsc";
    const matchedCourses = await query('SELECT fee FROM courses WHERE category = ? AND is_active = 1 LIMIT 1', [targetCategory]);
    
    // Default to 2999 if not found, otherwise convert to paise
    const feeInInr = matchedCourses.length > 0 ? parseInt(matchedCourses[0].fee) : 2999;
    const amount = feeInInr * 100; // Razorpay expects amount in paise
    const currency = 'INR';

    // Create Razorpay order
    const razorpay = getRazorpay();
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

    // Update application with Razorpay order ID and payment status
    // Note: payment_link_expires_at is set to NULL - links never expire
    await query(
      `UPDATE applications 
       SET razorpay_order_id = ?, 
           payment_status = 'pending',
           payment_link_expires_at = NULL,
           updated_at = NOW()
       WHERE id = ?`,
      [order.id, applicationId]
    );

    // Send FOMO email asynchronously (fire and forget)
    // Note: For 10-minute delay, use Vercel Cron Jobs to call /api/payment/send-fomo-emails
    sendFomoEmail(applicationId).catch((error) => {
      console.error('FOMO email failed to send:', error);
    });

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

