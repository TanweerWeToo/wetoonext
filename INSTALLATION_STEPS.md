# 🚀 Installation Steps for Email Automation System

Follow these steps to complete the integration:

---

## 📦 Step 1: Install NodeMailer

Run this command in your project root:

```bash
npm install nodemailer
```

---

## 🗄️ Step 2: Update Database Schema

Run the SQL migration file in phpMyAdmin or MySQL CLI:

```bash
# Option 1: Via phpMyAdmin
1. Open phpMyAdmin
2. Select database: u181984996_adminwetoo
3. Go to "SQL" tab
4. Copy and paste contents of: database/update_applications_payment_tracking.sql
5. Click "Go"

# Option 2: Via MySQL CLI
mysql -h srv1875.hstgr.io -u u181984996_adminwetoo -p u181984996_adminwetoo < database/update_applications_payment_tracking.sql
```

---

## ⚙️ Step 3: Configure Environment Variables

Create or update your `.env.local` file:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### How to get Gmail App Password:

1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Go to https://myaccount.google.com/apppasswords
4. Create App Password for "Mail"
5. Copy the 16-character password
6. Paste in `EMAIL_PASSWORD`

---

## 🧪 Step 4: Test the System

### Test 1: Submit a form without payment

1. Go to your homepage
2. Fill out the application form
3. Close the Razorpay popup without paying
4. Wait 10 minutes
5. **Check email** → You should receive FOMO email

### Test 2: Complete payment

1. Submit form and complete Razorpay payment
2. **Check email immediately** → You should receive Welcome email
3. Check database → `payment_status` should be `PAID`

### Test 3: Resume payment link

1. Open FOMO email
2. Click "Complete Payment Now" button
3. Should redirect to `/resume-payment?id=X`
4. Razorpay should open with pre-filled details
5. Complete payment → Welcome email sent

---

## 📂 Files Created/Modified

### ✅ New Files Created:

1. `src/lib/emailConfig.js` - Email configuration and utilities
2. `src/lib/emailTemplates.js` - HTML email templates (FOMO, Welcome, Failed)
3. `src/app/api/payment/resume/route.js` - Resume payment API
4. `src/app/resume-payment/page.jsx` - Resume payment page
5. `database/update_applications_payment_tracking.sql` - Database migration
6. `EMAIL_SETUP_GUIDE.md` - Complete setup documentation

### ✏️ Files Modified:

1. `src/app/api/payment/create-order/route.js` - Added FOMO email scheduling
2. `src/app/api/payment/verify/route.js` - Added welcome email + enrollment ID

---

## 🎯 Email Flow Summary

```
┌─────────────────────────────────────────────────────────┐
│          USER SUBMITS FORM                               │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  Application saved with status: PENDING_PAYMENT          │
│  Razorpay Order Created                                  │
│  payment_link_expires_at = NOW() + 48 hours              │
└─────────────────────────────────────────────────────────┘
                        ↓
              ┌─────────┴─────────┐
              │                   │
        PAID? NO                YES
              │                   │
              ↓                   ↓
    ┌─────────────────┐   ┌──────────────────┐
    │  After 10 mins  │   │  Immediately     │
    │  Send FOMO      │   │  Update DB:      │
    │  Email with     │   │  - PAID          │
    │  Resume Link    │   │  - enrollment_id │
    └─────────────────┘   │  - payment_id    │
                          │  Send Welcome    │
                          │  Email           │
                          └──────────────────┘
```

---

## 🔥 Production Checklist

Before going live:

- [ ] Install NodeMailer: `npm install nodemailer`
- [ ] Run database migration SQL
- [ ] Configure production email credentials
- [ ] Update `NEXT_PUBLIC_BASE_URL` to production domain
- [ ] Test FOMO email (wait 10 mins after incomplete payment)
- [ ] Test Welcome email (complete payment successfully)
- [ ] Test Resume Payment link (click link from FOMO email)
- [ ] Verify enrollment ID generation
- [ ] Check all emails render correctly in Gmail/Outlook
- [ ] Test link expiry (48 hours)
- [ ] Monitor email delivery rates

---

## 🐛 Common Issues & Fixes

### Issue 1: `Module not found: Can't resolve 'nodemailer'`

**Fix:**
```bash
npm install nodemailer
```

### Issue 2: Emails not sending

**Fix:**
1. Check `.env.local` has correct email credentials
2. For Gmail: Use App Password, not regular password
3. Check logs in terminal/console for error messages

### Issue 3: "Cannot find module @/lib/emailConfig"

**Fix:**
- Ensure all new files are created in correct locations
- Restart your Next.js dev server: `npm run dev`

### Issue 4: Database error about missing columns

**Fix:**
- Run the SQL migration: `database/update_applications_payment_tracking.sql`
- Verify columns added: `DESCRIBE applications;`

### Issue 5: Resume payment link returns 404

**Fix:**
- Ensure `src/app/resume-payment/page.jsx` exists
- Restart Next.js server
- Check file is in correct location

---

## 📈 Monitoring Email Delivery

Add this to check email status:

```sql
-- Check FOMO emails sent
SELECT full_name, email, payment_status, fomo_email_sent, created_at
FROM applications
WHERE payment_status = 'PENDING_PAYMENT'
ORDER BY created_at DESC;

-- Check Welcome emails sent
SELECT full_name, email, enrollment_id, welcome_email_sent, updated_at
FROM applications
WHERE payment_status = 'PAID'
ORDER BY updated_at DESC;
```

---

## 🎉 You're All Set!

Your email automation system is now ready. Users will receive:

✅ **FOMO Email** if they don't pay (10 mins delay)
✅ **Welcome Email** when payment succeeds (immediate)
✅ **Resume Payment Link** valid for 48 hours
✅ **Unique Enrollment ID** after payment

**Happy Automating! 🚀**

