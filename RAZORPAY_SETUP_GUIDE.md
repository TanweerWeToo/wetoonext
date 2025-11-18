# 💳 Razorpay Payment Integration Setup Guide

This guide will help you set up the Razorpay payment gateway for the application form on your website.

---

## 📋 **What Was Implemented**

### ✅ **Features**
1. **Application Popup Form** - A modern, responsive popup form on the homepage
2. **Razorpay Payment Integration** - Secure payment gateway for application fees
3. **Payment Verification** - Server-side payment signature verification
4. **Database Updates** - Automatic status update after successful payment
5. **User Experience** - Smooth flow from form submission → payment → confirmation

---

## 🚀 **Quick Setup (5 Steps)**

### **Step 1: Create Razorpay Account**

1. Go to [https://razorpay.com/](https://razorpay.com/)
2. Click "Sign Up" and create a free account
3. Complete KYC verification (required for production)
4. For testing, you can use **Test Mode** immediately

---

### **Step 2: Get Razorpay API Keys**

1. Log in to Razorpay Dashboard
2. Go to **Settings** → **API Keys**
3. Click **"Generate Test Keys"** (for development)
4. Copy both:
   - **Key ID** (starts with `rzp_test_`)
   - **Key Secret** (starts with a random string)

📝 **Note:** Keep your Key Secret safe and never commit it to Git!

---

### **Step 3: Update Environment Variables**

Add these to your `.env.local` file:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID_HERE
RAZORPAY_KEY_SECRET=YOUR_KEY_SECRET_HERE
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID_HERE
```

⚠️ **Important:**
- `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are server-side (private)
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` is exposed to the browser (public)

---

### **Step 4: Install Razorpay Package**

Run this command in your project directory:

```bash
pnpm install razorpay
```

---

### **Step 5: Test Payment Flow**

1. Start your development server:
   ```bash
   pnpm dev
   ```

2. Visit your homepage: `http://localhost:3000`

3. Click the **"Apply Now"** floating button (bottom-right)

4. Fill in the application form

5. Click **"Proceed to Payment"**

6. You'll see the Razorpay payment popup

7. Use **Test Card Details** (provided by Razorpay):
   - Card Number: `4111 1111 1111 1111`
   - CVV: Any 3 digits (e.g., `123`)
   - Expiry: Any future date (e.g., `12/25`)
   - Name: Any name

8. Complete the payment

9. You should see a success toast notification

10. Check the **Admin Panel → Applications** to verify:
    - New application is listed
    - `paid` status is `1` (Yes)
    - Status is `Pending`

---

## 🎨 **Customization Options**

### **Change Application Fee**

Edit `src/app/api/payment/create-order/route.js`:

```javascript
// Current: ₹499 (49900 paise)
const amount = 49900;

// Change to ₹999 (99900 paise)
const amount = 99900;
```

Also update the display in `src/components/ApplicationPopup.jsx`:

```jsx
<p className="text-sm text-gray-600">
  Application Fee: <span className="font-semibold text-lg text-slate-800">₹999</span>
</p>
```

### **Customize Razorpay Popup Colors**

Edit `src/components/ApplicationPopup.jsx`, find the `options` object:

```javascript
theme: {
  color: "#1e293b", // Change to your brand color
},
```

### **Add More Fields to Form**

1. Update `formData` state in `ApplicationPopup.jsx`
2. Add input fields in the form JSX
3. Update the API route to accept new fields

---

## 🔐 **Security Considerations**

### ✅ **What's Secure:**
- Payment signature verification on server-side
- Razorpay secret key is never exposed to the browser
- Database updates only after verified payment
- HTTPS required for production Razorpay

### ⚠️ **Important for Production:**

1. **Enable HTTPS** - Razorpay requires HTTPS in production
2. **Use Production Keys** - Switch from test to live keys
3. **Complete KYC** - Required to activate live payments
4. **Test Thoroughly** - Always test with test keys first
5. **Monitor Webhooks** - Set up Razorpay webhooks for backup verification

---

## 🐛 **Troubleshooting**

### **Problem: Razorpay popup doesn't open**
**Solution:**
- Check if `NEXT_PUBLIC_RAZORPAY_KEY_ID` is set correctly
- Check browser console for JavaScript errors
- Ensure Razorpay script is loading (check Network tab)

### **Problem: Payment succeeds but application not marked as paid**
**Solution:**
- Check API logs in terminal
- Verify database connection is working
- Check `applications` table has `paid` column
- Verify signature verification is not failing

### **Problem: "Invalid signature" error**
**Solution:**
- Double-check `RAZORPAY_KEY_SECRET` in `.env.local`
- Restart Next.js server after updating env variables
- Ensure no extra spaces in environment variables

### **Problem: Form submission fails**
**Solution:**
- Check database connection
- Verify all required fields are filled
- Check API route logs for errors
- Ensure `applications` table exists

---

## 📱 **Testing on Mobile**

1. Use ngrok or similar service to expose your local server:
   ```bash
   pnpm dev
   ngrok http 3000
   ```

2. Update `NEXT_PUBLIC_APP_URL` in `.env.local` to your ngrok URL

3. Open the ngrok URL on your mobile device

4. Test the complete flow on mobile

---

## 🚀 **Going Live (Production Setup)**

### **1. Switch to Live Razorpay Keys**

1. Complete KYC verification on Razorpay
2. Generate **Live API Keys** from Razorpay Dashboard
3. Update `.env.production` (on Vercel):
   ```env
   RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY_ID
   RAZORPAY_KEY_SECRET=YOUR_LIVE_KEY_SECRET
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY_ID
   ```

### **2. Set Up Razorpay Webhooks** (Recommended)

1. Go to Razorpay Dashboard → **Settings** → **Webhooks**
2. Add webhook URL: `https://yourdomain.com/api/payment/webhook`
3. Select events: `payment.captured`, `payment.failed`
4. Copy webhook secret
5. Create a new API route to handle webhooks (optional but recommended)

### **3. Update Application Fee Display**

Ensure the fee amount matches in:
- API route (`create-order/route.js`)
- Popup component (`ApplicationPopup.jsx`)

### **4. Test in Production**

1. Use real card details (small amount first)
2. Verify payment appears in Razorpay Dashboard
3. Verify application appears in admin panel with `paid = 1`
4. Test refund process if needed

---

## 📊 **Database Schema**

The `applications` table should have these columns:

```sql
CREATE TABLE applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  father_name VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  mobile VARCHAR(20) NOT NULL,
  dob DATE,
  state VARCHAR(100),
  degree VARCHAR(100),
  subject VARCHAR(100),
  grad_year VARCHAR(10),
  optional_paper VARCHAR(100),
  comments TEXT,
  course_name VARCHAR(255) NOT NULL,
  paid BOOLEAN DEFAULT FALSE,
  status VARCHAR(50) DEFAULT 'Pending',
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## 📁 **File Structure**

```
src/
├── components/
│   ├── ApplicationPopup.jsx       # Main application form popup
│   └── ApplyNowButton.jsx         # Floating "Apply Now" button
├── app/
│   ├── api/
│   │   ├── applications/
│   │   │   └── route.js           # Create application endpoint
│   │   └── payment/
│   │       ├── create-order/
│   │       │   └── route.js       # Create Razorpay order
│   │       └── verify/
│   │           └── route.js       # Verify payment signature
│   └── page.jsx                   # Homepage (includes button)
```

---

## 🎯 **Features Checklist**

- ✅ Responsive popup form with smooth animations
- ✅ Client-side form validation
- ✅ Duplicate mobile number check
- ✅ Razorpay payment gateway integration
- ✅ Payment signature verification
- ✅ Automatic database status update
- ✅ Loading states and error handling
- ✅ Toast notifications for user feedback
- ✅ Mobile-responsive design
- ✅ Floating "Apply Now" button with pulse animation
- ✅ Clean, modern UI using Tailwind CSS

---

## 📞 **Support**

If you encounter any issues:

1. Check this guide first
2. Review Razorpay documentation: [https://razorpay.com/docs/](https://razorpay.com/docs/)
3. Check browser console for errors
4. Check Next.js server logs
5. Verify all environment variables are set correctly

---

## 🔄 **Next Steps**

1. Test the complete flow end-to-end
2. Customize the form fields if needed
3. Update branding colors and text
4. Set up email notifications (optional)
5. Add more courses to the dropdown
6. Consider adding a "Payment History" section in admin panel

---

**🎉 You're all set!** The Razorpay integration is complete and ready to accept payments.

