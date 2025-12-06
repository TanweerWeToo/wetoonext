# Email Fix and Cron Job Setup

## Problem Fixed

The email system was not working because `setTimeout` doesn't work in serverless environments (like Vercel). When a serverless function completes, the execution context is destroyed, so any `setTimeout` callbacks never execute.

## Solution Implemented

### 1. Immediate Email Sending (Current Behavior)

FOMO emails are now sent **immediately** when a payment order is created. This ensures emails work right away without requiring any additional setup.

**File:** `src/app/api/payment/create-order/route.js`
- FOMO email is sent asynchronously when order is created
- Email is sent only if payment is still pending
- `fomo_email_sent` flag prevents duplicate emails

### 2. Cron Job Endpoint (Optional - for 10-minute delay)

A new API endpoint has been created for batch processing FOMO emails with a 10-minute delay:

**File:** `src/app/api/payment/send-fomo-emails/route.js`
- Processes all pending payments created more than 10 minutes ago
- Sends FOMO emails to users who haven't received them yet
- Can be called by a cron job for scheduled email sending

## Configuration Options

### Option 1: Keep Immediate Sending (Current - Recommended)

**Pros:**
- ✅ Emails work immediately
- ✅ No additional setup required
- ✅ Users get reminders right away

**Cons:**
- ❌ No 10-minute delay (emails sent immediately)

**Action:** No changes needed - this is the current setup.

---

### Option 2: Use Cron Job for 10-Minute Delay

If you want the original 10-minute delay behavior:

**Step 1:** Remove immediate sending from `create-order/route.js`

Comment out or remove this line (around line 115):
```javascript
// sendFomoEmail(applicationId).catch((error) => {
//   console.error('FOMO email failed to send:', error);
// });
```

**Step 2:** Set up Vercel Cron Job

The cron job is already configured in `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/payment/send-fomo-emails",
      "schedule": "*/10 * * * *"
    }
  ]
}
```

This runs every 10 minutes.

**Step 3:** Add Authentication (Optional but Recommended)

Add a `CRON_SECRET` environment variable in Vercel:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add: `CRON_SECRET` = (any random string, e.g., `your-secret-key-here`)
3. The cron endpoint will require this secret for security

**Step 4:** Deploy

After making changes, deploy to Vercel. The cron job will automatically start running.

---

## Email Types

### 1. FOMO Email (Reminder)
- **When:** Sent when payment order is created (immediate) OR via cron job (10-minute delay)
- **Purpose:** Remind users to complete payment
- **Contains:** Resume payment link

### 2. Welcome Email
- **When:** Sent immediately after successful payment verification
- **Purpose:** Welcome user and provide enrollment details
- **Contains:** Enrollment ID and course details

---

## Testing

### Test Immediate FOMO Email:
1. Submit an application form
2. Create a payment order (don't complete payment)
3. Check email inbox - FOMO email should arrive immediately

### Test Cron Job:
1. Manually call the endpoint:
   ```bash
   curl https://your-domain.com/api/payment/send-fomo-emails
   ```
2. Or wait for the cron job to run (every 10 minutes)

### Test Welcome Email:
1. Complete a payment successfully
2. Check email inbox - Welcome email should arrive immediately

---

## Troubleshooting

### Emails Not Sending?

1. **Check Environment Variables:**
   - `EMAIL_HOST`
   - `EMAIL_PORT`
   - `EMAIL_USER`
   - `EMAIL_PASSWORD`
   - `NEXT_PUBLIC_BASE_URL`

2. **Check Server Logs:**
   - Look for email sending errors in Vercel logs
   - Check console.log messages for email status

3. **Verify Email Configuration:**
   - Ensure Gmail App Password is set correctly (not regular password)
   - Check that SMTP settings are correct

4. **Database Check:**
   - Verify `fomo_email_sent` and `welcome_email_sent` flags in database
   - Check `payment_status` is correct

---

## Current Status

✅ **FOMO emails:** Sending immediately when order is created
✅ **Welcome emails:** Sending after successful payment
✅ **Cron endpoint:** Created and ready for use
✅ **No expiry limit:** Payment links work indefinitely

---

## Next Steps

1. **Test email sending** - Submit a test application and verify emails arrive
2. **Choose configuration** - Decide if you want immediate or delayed emails
3. **Set up cron job** (optional) - If you want 10-minute delay, follow Option 2 above
4. **Monitor email delivery** - Check Vercel logs and email inboxes

