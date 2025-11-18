# 🚀 Auto-Popup Form - Quick Reference

## ✅ **What's New**

1. **ShadCN UI Components** - Professional, accessible form components
2. **Auto-Trigger** - Popup appears automatically after 3 seconds
3. **Clean Design** - Matches your reference image aesthetic
4. **Green Theme** - Emerald accent colors throughout

---

## 🧪 **Quick Test**

```bash
# 1. Start server
pnpm dev

# 2. Visit homepage
http://localhost:3000

# 3. Wait 3 seconds → Popup appears automatically!

# 4. Fill form and test payment
Card: 4111 1111 1111 1111
CVV: 123
Expiry: 12/25
```

---

## ⚙️ **Quick Customizations**

### **Change Popup Delay**
**File:** `src/components/ApplyNowButton.jsx` (Line 11)
```javascript
setTimeout(() => {
  setIsPopupOpen(true);
}, 3000); // Change 3000 to desired milliseconds
```

### **Change Accent Color**
**File:** `src/components/ApplicationPopup.jsx`
```jsx
// Find: emerald-600
// Replace with: blue-600, green-600, purple-600, etc.
```

### **Show Only Once Per Session**
**File:** `src/components/ApplyNowButton.jsx`
```javascript
useEffect(() => {
  const hasShown = sessionStorage.getItem('popupShown');
  if (!hasShown) {
    const timer = setTimeout(() => {
      setIsPopupOpen(true);
      sessionStorage.setItem('popupShown', 'true');
    }, 3000);
    return () => clearTimeout(timer);
  }
}, []);
```

---

## 📋 **Form Fields**

**Required Fields (11):**
1. Select Course ✅
2. Full Name ✅
3. Father's Name ✅
4. Email Address ✅
5. Mobile Number ✅
6. Date of Birth ✅
7. State ✅
8. Recent Degree/Course Completed ✅
9. Subject ✅
10. Year of Passing ✅

**Optional Fields (2):**
11. Optional Paper
12. Additional Comments

---

## 🎨 **ShadCN Components Used**

- `Dialog` - Modal container
- `DialogContent` - Modal wrapper
- `DialogHeader` - Header section
- `DialogTitle` - Form title
- `DialogDescription` - Subtitle text
- `Input` - Text inputs
- `Select` - Dropdowns
- `Textarea` - Comments field
- `Button` - Submit button
- `Label` - Field labels

---

## 🐛 **Quick Troubleshooting**

| Issue | Fix |
|-------|-----|
| Popup doesn't appear | Check console for errors |
| 3-second delay not working | Verify `useEffect` in ApplyNowButton |
| Select dropdown not working | Check Radix UI Select installation |
| Styling looks broken | Verify ShadCN configuration |
| Payment not working | Check Razorpay keys in `.env.local` |

---

## 📁 **Modified Files**

```
✅ src/components/ApplicationPopup.jsx    (Rewritten with ShadCN)
✅ src/components/ApplyNowButton.jsx      (Auto-trigger logic)
✅ AUTO_POPUP_IMPLEMENTATION.md           (Full documentation)
✅ AUTO_POPUP_QUICK_REFERENCE.md          (This file)
```

---

## 🎯 **Key Features**

- ✅ Auto-opens after 3 seconds
- ✅ ShadCN UI throughout
- ✅ Clean green theme
- ✅ Fully responsive
- ✅ Payment integration works
- ✅ Admin panel compatible

---

## 📚 **Full Documentation**

For detailed setup, customization, and troubleshooting:
👉 **Read:** `AUTO_POPUP_IMPLEMENTATION.md`

For payment setup:
👉 **Read:** `RAZORPAY_SETUP_GUIDE.md`

---

**🎉 That's it! Your auto-popup registration form is ready!**

