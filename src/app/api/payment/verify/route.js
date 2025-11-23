import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { query } from '@/lib/db';
import { sendEmail, generateEnrollmentId } from '@/lib/emailConfig';
import { welcomeEmailTemplate } from '@/lib/emailTemplates';

export async function POST(request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      applicationId,
    } = await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !applicationId) {
      return NextResponse.json(
        { success: false, message: 'Missing required payment verification data' },
        { status: 400 }
      );
    }

    // Verify signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature !== expectedSign) {
      return NextResponse.json(
        { success: false, message: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Generate unique enrollment ID
    const enrollmentId = generateEnrollmentId();

    // Update application with payment success details
    await query(
      `UPDATE applications 
       SET paid = 1, 
           payment_status = 'PAID',
           razorpay_payment_id = ?,
           enrollment_id = ?,
           status = 'Pending', 
           updated_at = CURRENT_TIMESTAMP 
       WHERE id = ?`,
      [razorpay_payment_id, enrollmentId, applicationId]
    );

    // Fetch application details for welcome email
    const applications = await query(
      'SELECT * FROM applications WHERE id = ?',
      [applicationId]
    );

    if (applications.length > 0 && !applications[0].welcome_email_sent) {
      const app = applications[0];
      const amount = '2999'; // ₹2999

      const emailData = welcomeEmailTemplate({
        fullName: app.full_name,
        courseName: app.course_name,
        enrollmentId: enrollmentId,
        amount: amount,
      });

      // Send welcome email asynchronously (don't block response)
      sendEmail({
        to: app.email,
        subject: emailData.subject,
        html: emailData.html,
        text: emailData.text,
      }).then((result) => {
        if (result.success) {
          // Mark welcome email as sent
          query(
            'UPDATE applications SET welcome_email_sent = 1 WHERE id = ?',
            [applicationId]
          );
          console.log(`Welcome email sent to ${app.email}`);
        }
      }).catch((error) => {
        console.error('Welcome email error:', error);
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      paymentId: razorpay_payment_id,
      enrollmentId: enrollmentId,
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { success: false, message: 'Payment verification failed' },
      { status: 500 }
    );
  }
}

