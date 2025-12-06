// API endpoint to send FOMO emails for pending payments
// This should be called by a cron job every 5-10 minutes
// Vercel Cron: Add to vercel.json or use Vercel Cron Jobs dashboard
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { sendEmail, generateResumePaymentLink } from '@/lib/emailConfig';
import { fomoEmailTemplate } from '@/lib/emailTemplates';

export async function GET(request) {
  try {
    // Optional: Add authentication for cron job security
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Find all pending payments created more than 10 minutes ago that haven't received FOMO email
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    
    const applications = await query(
      `SELECT * FROM applications 
       WHERE payment_status = 'PENDING_PAYMENT' 
       AND fomo_email_sent = 0 
       AND submitted_at <= ?
       ORDER BY submitted_at ASC
       LIMIT 50`,
      [tenMinutesAgo]
    );

    let emailsSent = 0;
    let errors = [];

    for (const app of applications) {
      try {
        const resumeLink = generateResumePaymentLink(app.id);
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
            [app.id]
          );
          emailsSent++;
          console.log(`FOMO email sent to ${app.email} (Application ID: ${app.id})`);
        } else {
          errors.push(`Failed to send email to ${app.email}: ${emailResult.error}`);
        }
      } catch (error) {
        console.error(`Error sending FOMO email to ${app.email}:`, error);
        errors.push(`Error for ${app.email}: ${error.message}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${applications.length} applications`,
      emailsSent,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error('FOMO email cron job error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process FOMO emails', error: error.message },
      { status: 500 }
    );
  }
}

