# 💳 Payment Integration - Quick Start

## 🚀 **Installation (3 Commands)**

```bash
# 1. Install Razorpay package
pnpm install razorpay

# 2. Copy environment variables template
cp .env.example .env.local

# 3. Start development server
pnpm dev
```

---

## 🔑 **Get Razorpay Keys (2 Minutes)**

1. **Sign up:** [https://razorpay.com/](https://razorpay.com/)
2. **Navigate:** Dashboard → Settings → API Keys
3. **Generate:** Click "Generate Test Keys"
4. **Copy:** Both Key ID and Secret

---

## ⚙️ **Configure Environment Variables**

Edit `.env.local` and add:

```env
# Razorpay Test Keys
RAZORPAY_KEY_ID=rzp_test_PASTE_YOUR_KEY_ID_HERE
RAZORPAY_KEY_SECRET=PASTE_YOUR_SECRET_KEY_HERE
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_PASTE_YOUR_KEY_ID_HERE
```

**⚠️ Important:**
- Use **test keys** for development
- Use **live keys** only in production
- Never commit `.env.local` to Git

---

## 🧪 **Test the Integration**

### **Step 1: Start Server**
```bash
pnpm dev
```

### **Step 2: Open Homepage**
Visit: [http://localhost:3000](http://localhost:3000)

### **Step 3: Click "Apply Now"**
- Look for the floating button at bottom-right corner
- It has a pulse animation

### **Step 4: Fill the Form**
Required fields:
- Select Course
- Full Name
- Father's Name
- Email
- Mobile (10 digits)
- Date of Birth
- State
- Degree
- Subject
- Graduation Year

### **Step 5: Complete Test Payment**

Click **"Proceed to Payment"** → Razorpay popup opens

**Use Razorpay Test Cards:**

✅ **Success Card:**
```
Card Number: 4111 1111 1111 1111
CVV: 123
Expiry: 12/25
Name: Test User
```

❌ **Failure Card (to test error handling):**
```
Card Number: 4000 0000 0000 0002
CVV: 123
Expiry: 12/25
Name: Test User
```

### **Step 6: Verify in Admin Panel**

1. Go to: [http://localhost:3000/admin](http://localhost:3000/admin)
2. Navigate to: **Applications**
3. Check the latest entry:
   - ✅ `Paid` column should show "Yes"
   - ✅ `Status` should show "Pending"

---

## 📱 **Test on Mobile**

### **Option 1: Use ngrok**
```bash
# Install ngrok if not already installed
# Download from: https://ngrok.com/download

# Expose local server
pnpm dev
# In another terminal:
ngrok http 3000

# Copy the HTTPS URL and test on mobile
```

### **Option 2: Use Local Network IP**
```bash
# Find your local IP
# Windows:
ipconfig
# Look for IPv4 Address (e.g., 192.168.1.100)

# Mac/Linux:
ifconfig
# Look for inet (e.g., 192.168.1.100)

# Start server on all interfaces
pnpm dev -- -H 0.0.0.0

# Access from mobile: http://YOUR_IP:3000
```

---

## 🎨 **Customization Quick Tips**

### **Change Application Fee**

**File:** `src/app/api/payment/create-order/route.js`
```javascript
// Line ~17
const amount = 49900; // ₹499 → Change to 99900 for ₹999
```

**File:** `src/components/ApplicationPopup.jsx`
```jsx
// Line ~364
Application Fee: <span>₹499</span> → Change to ₹999
```

### **Change Button Position**

**File:** `src/components/ApplyNowButton.jsx`
```jsx
// Line 17 - Current: bottom-right
className="fixed bottom-8 right-8 z-40"

// Change to bottom-left:
className="fixed bottom-8 left-8 z-40"

// Change to top-right:
className="fixed top-8 right-8 z-40"
```

### **Change Button Color**

**File:** `src/components/ApplyNowButton.jsx`
```jsx
// Line 23 - Current: slate-800 to slate-900
className="bg-linear-to-r from-slate-800 to-slate-900 ..."

// Change to blue gradient:
className="bg-linear-to-r from-blue-600 to-blue-800 ..."

// Change to green gradient:
className="bg-linear-to-r from-green-600 to-green-800 ..."
```

### **Add More Courses**

**File:** `src/components/ApplicationPopup.jsx`
```jsx
// Around line ~201, add new option:
<option value="Your New Course Name">Your New Course Name</option>
```

---

## 🐛 **Common Issues & Fixes**

### **Issue: Button doesn't appear**
**Fix:**
```bash
# Clear Next.js cache and rebuild
rm -rf .next
pnpm dev
```

### **Issue: Razorpay popup doesn't open**
**Fix:**
- Check browser console (F12)
- Verify `NEXT_PUBLIC_RAZORPAY_KEY_ID` is set in `.env.local`
- Restart dev server after changing env variables

### **Issue: Payment succeeds but not marked as paid**
**Check:**
1. Database connection is working
2. `applications` table has `paid` column (BOOLEAN type)
3. Server logs for errors
4. Verify `RAZORPAY_KEY_SECRET` is correct

### **Issue: "Invalid signature" error**
**Fix:**
```bash
# 1. Verify secret key in .env.local (no extra spaces)
# 2. Restart server
pnpm dev
```

---

## 📊 **Test Checklist**

Before considering the integration complete:

- [ ] Button appears on homepage
- [ ] Button has pulse animation
- [ ] Popup opens on click
- [ ] All form fields are visible
- [ ] Form validation works
- [ ] Mobile number format is validated (10 digits)
- [ ] Test payment with success card works
- [ ] Test payment with failure card shows error
- [ ] Application appears in admin panel
- [ ] Paid status is correctly set to "Yes"
- [ ] Status is set to "Pending"
- [ ] Form resets after successful payment
- [ ] Popup closes after successful payment
- [ ] Toast notifications work
- [ ] Mobile responsive design works
- [ ] No console errors

---

## 📞 **Quick Support**

**Documentation:**
- Full Setup Guide: `RAZORPAY_SETUP_GUIDE.md`
- Feature Summary: `PAYMENT_INTEGRATION_SUMMARY.md`
- Razorpay Docs: [https://razorpay.com/docs/](https://razorpay.com/docs/)

**Check Logs:**
```bash
# Next.js server logs (check terminal)
# Browser console (F12 → Console tab)
# Network tab (F12 → Network tab)
```

---

## 🎯 **Next Steps**

1. ✅ Test with test cards
2. ✅ Verify admin panel integration
3. ✅ Test on mobile devices
4. 📧 Add email notifications (optional)
5. 🚀 Deploy to production (see `RAZORPAY_SETUP_GUIDE.md`)

---

**⚡ That's it! Your payment integration is ready to test.**

**📚 For production deployment, see:** `RAZORPAY_SETUP_GUIDE.md` → "Going Live" section

