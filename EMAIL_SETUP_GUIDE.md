# 📧 Email Automation Setup Guide

This guide will help you configure email automation for the payment tracking system.

## 🔧 Required Environment Variables

Add these to your `.env.local` file:

```env
# Email Configuration (NodeMailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=yourapp@gmail.com
EMAIL_PASSWORD=your_gmail_app_password

# Application Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
# For production: NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

---

## 📮 Setting Up Gmail for NodeMailer

### Option 1: Using Gmail App Password (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Select **Mail** as the app and **Other (Custom name)** as the device
4. Enter "WeToo Media App" as the name
5. Click **Generate**
6. Copy the 16-character password
7. Add to your `.env.local`:

```env
EMAIL_USER=yourapp@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop  # (16-character app password)
```

### Option 2: Using Other Email Providers

#### **Outlook/Hotmail:**
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
```

#### **Yahoo Mail:**
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_USER=your-email@yahoo.com
EMAIL_PASSWORD=your-app-password
```

#### **Custom SMTP Server:**
```env
EMAIL_HOST=smtp.yourdomain.com
EMAIL_PORT=587
EMAIL_USER=noreply@yourdomain.com
EMAIL_PASSWORD=your-password
```

---

## 📦 Install Required Package

Run this command to install NodeMailer:

```bash
npm install nodemailer
```

---

## 🗄️ Database Schema Update

Run the SQL migration file to add email tracking fields:

```bash
# In phpMyAdmin or MySQL CLI
source database/update_applications_payment_tracking.sql
```

Or manually run these commands:

```sql
USE u181984996_adminwetoo;

ALTER TABLE applications
ADD COLUMN payment_status ENUM('PENDING_PAYMENT', 'PAID', 'FAILED', 'CANCELLED') DEFAULT 'PENDING_PAYMENT' AFTER paid;

ALTER TABLE applications
ADD COLUMN razorpay_order_id VARCHAR(255) NULL AFTER payment_status;

ALTER TABLE applications
ADD COLUMN razorpay_payment_id VARCHAR(255) NULL AFTER razorpay_order_id;

ALTER TABLE applications
ADD COLUMN enrollment_id VARCHAR(50) NULL UNIQUE AFTER razorpay_payment_id;

ALTER TABLE applications
ADD COLUMN payment_link_expires_at DATETIME NULL AFTER enrollment_id;

ALTER TABLE applications
ADD COLUMN fomo_email_sent TINYINT(1) DEFAULT 0 AFTER payment_link_expires_at;

ALTER TABLE applications
ADD COLUMN welcome_email_sent TINYINT(1) DEFAULT 0 AFTER fomo_email_sent;

CREATE INDEX idx_payment_status ON applications(payment_status);
CREATE INDEX idx_razorpay_order_id ON applications(razorpay_order_id);
```

---

## 🔄 How the Email System Works

### **Scenario 1: User Doesn't Complete Payment**

1. User fills form and submits
2. Application saved with status `PENDING_PAYMENT`
3. Razorpay popup opens
4. User exits without paying
5. **After 10 minutes:** System checks if payment still pending
6. **FOMO email sent** with "Resume Payment" link
7. Link valid for **48 hours**

### **Scenario 2: User Completes Payment**

1. User fills form and pays successfully
2. Payment verified via Razorpay webhook
3. Database updated:
   - `payment_status` → `PAID`
   - `enrollment_id` generated (e.g., `WETOO-ABC123-XYZ`)
   - `razorpay_payment_id` saved
4. **Welcome email sent immediately** with enrollment details

---

## 📧 Email Templates Included

### 1. **FOMO Email** (`fomoEmailTemplate`)
- Subject: "⏰ Complete Your Payment - Your Seat is Reserved!"
- Includes: Resume payment link, urgency message, features list
- Sent: 10 minutes after incomplete payment
- Expiry: 48 hours

### 2. **Welcome Email** (`welcomeEmailTemplate`)
- Subject: "🎉 Welcome to WeToo Media - Payment Confirmed!"
- Includes: Enrollment ID, payment receipt, next steps
- Sent: Immediately after successful payment

### 3. **Payment Failed Email** (`paymentFailedEmailTemplate`) [Optional]
- Subject: "❌ Payment Failed - Try Again"
- Includes: Retry link, common failure reasons
- Can be triggered for failed transactions

---

## 🔗 Resume Payment Flow

When a user clicks the "Resume Payment" link from the FOMO email:

1. Link format: `https://yourdomain.com/resume-payment?id=123`
2. System checks:
   - ✅ Application exists
   - ✅ Payment not already completed
   - ✅ Link not expired (48 hours)
3. If valid → Razorpay checkout opens with pre-filled details
4. After payment → Welcome email sent

---

## 🧪 Testing Email System

### Test FOMO Email:
```javascript
// In browser console or test script
fetch('/api/payment/create-order', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ applicationId: 1 })
});

// Wait 10 minutes or manually trigger email
```

### Test Welcome Email:
Complete a payment successfully and check inbox.

---

## 🐛 Troubleshooting

### Problem: Emails not sending

**Solution:**
1. Check `.env.local` has correct credentials
2. Verify Gmail App Password is correct (no spaces)
3. Check server logs for error messages
4. Test email credentials:

```javascript
// Test email connection
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'yourapp@gmail.com',
    pass: 'your-app-password'
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Server ready to send emails');
  }
});
```

### Problem: Resume payment link not working

**Solution:**
1. Check `NEXT_PUBLIC_BASE_URL` is correct
2. Verify link hasn't expired (48 hours)
3. Check application status in database

### Problem: FOMO email sent immediately

**Solution:**
- The FOMO email has a 10-minute delay built-in
- Check `scheduleFomoEmail` function in `create-order/route.js`
- Adjust delay time if needed

---

## 🎨 Customizing Email Templates

Edit templates in `src/lib/emailTemplates.js`:

```javascript
// Change FOMO delay
setTimeout(async () => {
  // Email logic
}, 10 * 60 * 1000); // Change 10 to desired minutes

// Change link expiry
const expiryDate = new Date();
expiryDate.setHours(expiryDate.getHours() + 48); // Change 48 to desired hours

// Customize email content
export const fomoEmailTemplate = ({ fullName, ... }) => {
  return {
    subject: 'Your custom subject',
    html: `<h1>Hello ${fullName}</h1>...`,
  };
};
```

---

## 🚀 Production Deployment Checklist

- [ ] Update `NEXT_PUBLIC_BASE_URL` to production domain
- [ ] Use production email account (not personal Gmail)
- [ ] Set up email monitoring/logging
- [ ] Test all email flows in production
- [ ] Configure email rate limits if needed
- [ ] Set up email bounce handling
- [ ] Add unsubscribe link (if required)
- [ ] Configure SPF/DKIM records for better deliverability

---

## 📞 Support

If you face any issues:
1. Check server logs for errors
2. Verify all environment variables
3. Test email credentials separately
4. Check database schema is updated
5. Ensure NodeMailer package is installed

---

**Ready to go! 🎉** Your email automation system is now set up.

