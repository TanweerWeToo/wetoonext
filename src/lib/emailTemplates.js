// HTML Email Templates for Course Application System

// FOMO Email Template (Payment Incomplete)
export const fomoEmailTemplate = ({ fullName, courseName, resumePaymentLink, amount }) => {
  return {
    subject: '⏰ Complete Your Payment - Your Seat is Reserved!',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; }
    .content { padding: 30px; }
    .alert-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px; }
    .cta-button { display: inline-block; background: #10b981; color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; text-align: center; }
    .cta-button:hover { background: #059669; }
    .features { background: #f9fafb; padding: 20px; border-radius: 6px; margin: 20px 0; }
    .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #666; }
    .highlight { color: #10b981; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎯 Don't Miss Out!</h1>
    </div>
    
    <div class="content">
      <h2>Hi ${fullName},</h2>
      
      <p>We noticed that you started your registration for <strong>${courseName}</strong> but didn't complete the payment.</p>
      
      <div class="alert-box">
        <strong>⏰ Your seat is temporarily reserved!</strong><br>
        Complete your payment soon to secure your spot before the batch fills up.
      </div>
      
      <div class="features">
        <h3>Why Complete Your Payment Now?</h3>
        <ul>
          <li>✅ Limited seats available</li>
          <li>✅ Early access to course materials</li>
          <li>✅ Join exclusive WhatsApp community</li>
          <li>✅ Get mentorship from experienced professionals</li>
        </ul>
      </div>
      
      <p style="font-size: 18px; text-align: center;">
        <strong>Payment Amount: <span class="highlight">₹${amount}/-</span></strong>
      </p>
      
      <div style="text-align: center;">
        <a href="${resumePaymentLink}" class="cta-button">
          💳 Complete Payment Now
        </a>
      </div>
      
      <p style="text-align: center; color: #666; font-size: 14px;">
        This link will expire in 48 hours for security reasons.
      </p>
      
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
      
      <p style="font-size: 14px; color: #666;">
        If you're facing any issues with the payment, please reply to this email or contact us at <strong>support@wetoomedia.com</strong>
      </p>
    </div>
    
    <div class="footer">
      <p>© ${new Date().getFullYear()} WeToo Media. All rights reserved.</p>
      <p>You're receiving this email because you started a course registration.</p>
    </div>
  </div>
</body>
</html>
    `,
    text: `Hi ${fullName},\n\nWe noticed you started registration for ${courseName} but didn't complete payment.\n\nYour seat is temporarily reserved. Complete payment now: ${resumePaymentLink}\n\nAmount: ₹${amount}/-\n\nThis link expires in 48 hours.\n\nFor help, email support@wetoomedia.com\n\nWeToo Media`,
  };
};

// Welcome Email Template (Payment Successful)
export const welcomeEmailTemplate = ({ fullName, courseName, enrollmentId, amount }) => {
  return {
    subject: '🎉 Welcome to WeToo Media - Payment Confirmed!',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 40px; text-align: center; }
    .header h1 { margin: 0; font-size: 32px; }
    .success-icon { font-size: 60px; margin: 10px 0; }
    .content { padding: 30px; }
    .enrollment-box { background: #d1fae5; border: 2px solid #10b981; padding: 20px; border-radius: 8px; text-align: center; margin: 25px 0; }
    .enrollment-box h3 { margin: 0 0 10px 0; color: #065f46; }
    .enrollment-id { font-size: 24px; font-weight: bold; color: #10b981; letter-spacing: 2px; }
    .info-box { background: #f9fafb; padding: 20px; border-radius: 6px; margin: 20px 0; }
    .cta-button { display: inline-block; background: #10b981; color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
    .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="success-icon">✅</div>
      <h1>Payment Successful!</h1>
      <p style="font-size: 18px; margin: 10px 0 0 0;">Welcome to WeToo Media</p>
    </div>
    
    <div class="content">
      <h2>Congratulations, ${fullName}! 🎊</h2>
      
      <p>Your payment has been successfully processed and your enrollment in <strong>${courseName}</strong> is now confirmed!</p>
      
      <div class="enrollment-box">
        <h3>Your Enrollment ID</h3>
        <div class="enrollment-id">${enrollmentId}</div>
        <p style="margin: 10px 0 0 0; font-size: 14px; color: #065f46;">Please save this ID for future reference</p>
      </div>
      
      <div class="info-box">
        <h3>📋 Payment Details</h3>
        <p><strong>Course:</strong> ${courseName}</p>
        <p><strong>Amount Paid:</strong> ₹${amount}/-</p>
        <p><strong>Payment Status:</strong> <span style="color: #10b981; font-weight: bold;">Confirmed ✓</span></p>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN', { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric' 
        })}</p>
      </div>
      
      <h3>🚀 What's Next?</h3>
      <ul>
        <li>📱 You'll be added to our exclusive WhatsApp group within 24 hours</li>
        <li>📚 Course materials will be shared in the group</li>
        <li>📅 Class schedule will be announced soon</li>
        <li>👨‍🏫 Meet your mentors and batch mates</li>
      </ul>
      
      <div style="background: #fef3c7; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b; margin: 20px 0;">
        <strong>📞 Need Help?</strong><br>
        Our support team is here for you! Reach out at <strong>support@wetoomedia.com</strong> or WhatsApp us at <strong>+91-XXXXXXXXXX</strong>
      </div>
      
      <p style="font-size: 16px; text-align: center; margin: 30px 0;">
        We're excited to have you on this journey! 🎯
      </p>
    </div>
    
    <div class="footer">
      <p>© ${new Date().getFullYear()} WeToo Media. All rights reserved.</p>
      <p><strong>Thank you for choosing WeToo Media!</strong></p>
    </div>
  </div>
</body>
</html>
    `,
    text: `Congratulations, ${fullName}!\n\nYour payment for ${courseName} has been confirmed!\n\nEnrollment ID: ${enrollmentId}\nAmount Paid: ₹${amount}/-\n\nWhat's Next:\n- You'll be added to WhatsApp group within 24 hours\n- Course materials will be shared\n- Class schedule coming soon\n\nNeed help? Email: support@wetoomedia.com\n\nWeToo Media`,
  };
};

// Payment Failed/Cancelled Email Template (Optional)
export const paymentFailedEmailTemplate = ({ fullName, courseName, resumePaymentLink }) => {
  return {
    subject: '❌ Payment Failed - Try Again',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 20px auto; background: #fff; border-radius: 8px; padding: 30px; }
    .header { color: #ef4444; text-align: center; }
    .cta-button { display: inline-block; background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>⚠️ Payment Failed</h1>
    </div>
    
    <p>Hi ${fullName},</p>
    
    <p>Unfortunately, your payment for <strong>${courseName}</strong> could not be processed.</p>
    
    <p><strong>This could be due to:</strong></p>
    <ul>
      <li>Insufficient balance</li>
      <li>Bank declined the transaction</li>
      <li>Network timeout</li>
    </ul>
    
    <p>Don't worry! Your seat is still reserved. You can try again:</p>
    
    <div style="text-align: center;">
      <a href="${resumePaymentLink}" class="cta-button">Retry Payment</a>
    </div>
    
    <p>For assistance, contact us at support@wetoomedia.com</p>
    
    <p>Best regards,<br><strong>WeToo Media Team</strong></p>
  </div>
</body>
</html>
    `,
    text: `Hi ${fullName},\n\nYour payment for ${courseName} failed. You can retry here: ${resumePaymentLink}\n\nFor help, email support@wetoomedia.com\n\nWeToo Media`,
  };
};

