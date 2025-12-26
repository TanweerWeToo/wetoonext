# Payment UX Fix - Summary

## Problem
Users were getting "phone number already registered" error when they cancelled payment and tried to register again, even though payment was incomplete.

## Solution Implemented

### 1. Database Schema Update
**File:** `database/update_payment_status_lowercase.sql`

- Updated `payment_status` field to use lowercase values: `'pending'`, `'paid'`, `'cancelled'`, `'expired'`
- Ensured `razorpay_order_id` field exists
- `updated_at` field already exists (auto-updated by MySQL)

**To apply:** Run the SQL migration file on your database.

### 2. Applications API Route Update
**File:** `src/app/api/applications/route.js`

**Changes:**
- Now checks `payment_status` before rejecting duplicate phone numbers
- If status is `'paid'` → Returns error (already registered)
- If status is `'pending'`, `'cancelled'`, or `'expired'` → Updates existing record and returns it with `isResume: true`
- Returns existing form data for auto-fill
- Creates new record only if phone number doesn't exist

### 3. Payment Routes Update
**Files:** 
- `src/app/api/payment/create-order/route.js`
- `src/app/api/payment/verify/route.js`

**Changes:**
- Updated to use lowercase payment status values
- `create-order`: Sets status to `'pending'` when order is created
- `verify`: Sets status to `'paid'` when payment is successful

### 4. ApplicationPopup Component Update
**File:** `src/components/ApplicationPopup.jsx`

**New Features:**
- **localStorage Persistence**: Saves form data to localStorage before submission (key: `pendingFormData_[phoneNumber]`)
- **Auto-fill on Mount**: Checks URL params (`?phone=xxx`) and localStorage for pending data
- **Resume Payment Indicator**: Shows amber banner when pending payment is detected
- **Payment Cancellation**: Keeps status as `'pending'` (user can resume later)
- **Clear on Success**: Removes localStorage entry after successful payment

**Flow:**
1. User fills form → Data saved to localStorage
2. User submits → Application created/updated with status `'pending'`
3. Razorpay modal opens
4. If user cancels → Status stays `'pending'`, data remains in localStorage
5. User returns → Form auto-fills from localStorage
6. User submits again → API detects pending payment, updates record, allows payment
7. Payment succeeds → localStorage cleared, status set to `'paid'`

### 5. Phone Validation Endpoint
**File:** `src/app/api/applications/check-phone/route.js`

**New API Endpoint:** `POST /api/applications/check-phone`

**Purpose:** Check if phone number is already registered and get payment status

**Request:**
```json
{
  "mobile": "1234567890",
  "courseName": "IAS Mentorship"
}
```

**Response (if exists with pending payment):**
```json
{
  "success": true,
  "exists": true,
  "paymentStatus": "pending",
  "applicationId": 123,
  "existingData": { ... },
  "message": "You have a pending payment. You can resume your application."
}
```

**Response (if paid):**
```json
{
  "success": false,
  "exists": true,
  "paymentStatus": "paid",
  "message": "This mobile number is already registered for this course"
}
```

## User Experience Flow

### Scenario 1: New User
1. User fills form → Submits
2. Application created with status `'pending'`
3. Razorpay opens
4. User completes payment → Status → `'paid'` ✅

### Scenario 2: User Cancels Payment
1. User fills form → Submits
2. Application created with status `'pending'`
3. Razorpay opens
4. User cancels → Status stays `'pending'`, data in localStorage
5. User returns later → Form auto-fills
6. User submits again → API detects pending, updates record
7. Razorpay opens again
8. User completes payment → Status → `'paid'` ✅

### Scenario 3: User Already Paid
1. User tries to register with same phone
2. API checks → Status is `'paid'`
3. Returns error: "This mobile number is already registered" ✅

## Database Migration

**Important:** Run the migration SQL file before deploying:

```bash
mysql -u your_user -p your_database < database/update_payment_status_lowercase.sql
```

Or execute it directly in your database management tool.

## Testing Checklist

- [ ] New user registration works
- [ ] User cancels payment → Can resume later
- [ ] Form data persists in localStorage
- [ ] Auto-fill works when returning to form
- [ ] Duplicate phone with paid status shows error
- [ ] Payment success clears localStorage
- [ ] Payment success updates status to 'paid'
- [ ] Resume payment indicator shows when pending

## Notes

- Payment status `'cancelled'` is available but currently not automatically set. All cancelled payments stay as `'pending'` for better UX (users can always resume).
- Payment status `'expired'` is available for future use (e.g., if you want to expire payments after X hours).
- localStorage keys are scoped by phone number: `pendingFormData_[phoneNumber]`
- The system gracefully handles missing localStorage (works in all browsers, even if localStorage is disabled)

