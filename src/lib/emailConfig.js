// NodeMailer Configuration for Email Automation
import nodemailer from 'nodemailer';

// Create reusable transporter
export const createEmailTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // Your email (e.g., yourapp@gmail.com)
      pass: process.env.EMAIL_PASSWORD, // App password (not regular password)
    },
  });
};

// Generate unique enrollment ID
export const generateEnrollmentId = () => {
  const prefix = 'WETOO';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

// Generate resume payment link
export const generateResumePaymentLink = (applicationId) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.wetoomedia.com';
  return `${baseUrl}/resume-payment?id=${applicationId}`;
};

// Send email utility function
export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const transporter = createEmailTransporter();
    
    const mailOptions = {
      from: `"WeToo Media" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      text, // Fallback plain text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
};

