# 🚀 Image Upload - Quick Start Guide

## ✅ **Answer: YES, it is possible!**

Image upload from Next.js (Vercel) to Hostinger shared hosting **works perfectly** using:
- ✅ Next.js API Routes
- ✅ MySQL (for storing file URLs)
- ✅ Hostinger (as external storage via HTTP upload)
- ❌ NO Vercel Blob/Storage needed

---

## 🎯 **Quick Setup (5 Steps)**

### **Step 1: Upload PHP Script to Hostinger** (2 minutes)

1. Download: `hostinger_upload_script/upload.php`
2. Upload to: `public_html/api/upload.php`
3. Create folder: `public_html/uploads/`
4. Set permissions:
   - `upload.php` → **644**
   - `uploads/` → **755**

**Note:** Subfolders (`gallery/`, `courses/`) are auto-created on first upload!

### **Step 2: Configure upload.php** (1 minute)

Edit two lines in `upload.php`:

```php
// Line 15: Change secret key
$uploadSecret = 'PUT_YOUR_SECURE_KEY_HERE';

// Line 89: Change domain
$baseUrl = 'https://yourdomain.com';
```

### **Step 3: Add Environment Variables** (1 minute)

Create `.env.local`:

```bash
HOSTINGER_UPLOAD_URL=https://yourdomain.com/api/upload.php
UPLOAD_SECRET_KEY=PUT_YOUR_SECURE_KEY_HERE
```

⚠️ **Secret key must match the one in upload.php!**

### **Step 4: Deploy to Vercel** (2 minutes)

1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add:
   - `HOSTINGER_UPLOAD_URL`
   - `UPLOAD_SECRET_KEY`
3. Redeploy

### **Step 5: Test!** (1 minute)

1. Go to `/admin/gallery`
2. Click "Add Image"
3. Upload a file
4. See it appear in gallery!

---

## 📂 **Files Modified**

### ✅ Created (3 files)
1. `hostinger_upload_script/upload.php` - PHP endpoint on Hostinger
2. `src/app/api/admin/upload-image/route.js` - Next.js API route
3. `IMAGE_UPLOAD_SETUP_GUIDE.md` - Full documentation

### ✅ Updated (2 files)
1. `src/app/admin/gallery/page.jsx` - Added file upload UI
2. `src/app/admin/courses/page.jsx` - Added file upload UI

---

## 🎨 **UI Features**

### Gallery & Courses Now Support:

✅ **File Upload**
- Drag & drop interface
- Live preview before upload
- File validation (type, size)
- Upload progress feedback

✅ **OR URL Input**
- Keep existing URL input option
- Choose file OR URL (not both)
- Flexibility for external images

✅ **User Experience**
- Auto-disables when uploading
- Shows file info (name, size)
- Success/error toast notifications
- Preview updates in real-time

---

## 🔄 **How It Works**

```
User selects file in Admin Panel
         ↓
Next.js validates (type, size)
         ↓
Sends to /api/admin/upload-image (with folder: 'gallery' or 'courses')
         ↓
Forwards to Hostinger PHP endpoint
         ↓
PHP saves to public_html/uploads/{folder}/
         ↓
Returns URL: https://domain.com/uploads/{folder}/file.jpg
         ↓
Next.js stores URL in MySQL
         ↓
Image displays on frontend
```

---

## 🔒 **Security Features**

✅ **Admin authentication** - Only logged-in admins can upload  
✅ **Secret key validation** - Prevents unauthorized access  
✅ **File type restrictions** - Only images (JPEG, PNG, GIF, WebP)  
✅ **Size limits** - 5MB maximum  
✅ **Unique filenames** - Prevents overwrites  
✅ **Server-side validation** - Double-checked security

---

## 📸 **Usage Example**

### Gallery Upload:
```javascript
1. Admin clicks "Add Image"
2. Selects file: photo.jpg (2.5MB)
3. Sees preview
4. Clicks "Add Image"
5. System uploads to Hostinger
6. Returns URL: https://domain.com/uploads/gallery/1234567890_abc123.jpg
7. Saves to MySQL gallery table
8. Image appears on website
```

### Course Upload:
```javascript
Same flow, but:
- Folder: "courses" instead of "gallery"
- URL: https://domain.com/uploads/courses/1234567890_def456.jpg
- Optional: Can skip image (not required)
```

---

## ✅ **What You Get**

### Frontend (UI):
- ✅ File input with drag & drop
- ✅ URL input as alternative
- ✅ Live preview
- ✅ Upload progress
- ✅ Error handling

### Backend (API):
- ✅ File validation
- ✅ Secure upload to Hostinger
- ✅ MySQL integration
- ✅ Error handling
- ✅ Success responses

### Hostinger (Storage):
- ✅ PHP upload endpoint
- ✅ File organization by folder
- ✅ Public URL generation
- ✅ Security validation

---

## 🐛 **Common Issues & Fixes**

| Issue | Fix |
|-------|-----|
| "Unauthorized" | Check secret keys match |
| "Upload failed" | Verify upload.php location |
| "File too large" | Max 5MB, reduce size |
| Works locally, not production | Add env vars to Vercel |
| Images don't display | Check base URL in upload.php |

---

## 📊 **Technical Specs**

- **Supported formats:** JPEG, PNG, GIF, WebP
- **Max file size:** 5MB
- **Upload method:** HTTP POST (multipart/form-data)
- **Storage location:** `public_html/uploads/{folder}/`
  - Gallery: `public_html/uploads/gallery/`
  - Courses: `public_html/uploads/courses/`
- **Filename format:** `{timestamp}_{random}.{ext}`
- **URL format:** `https://domain.com/uploads/{folder}/{filename}`

---

## 🎉 **Result**

Your admin panel now supports:

✅ **Upload from computer** - Direct file upload  
✅ **URL input** - Link to external images  
✅ **Hostinger storage** - No Vercel Blob costs  
✅ **MySQL tracking** - All URLs stored  
✅ **Production ready** - Secure & reliable

---

## 📞 **Need Help?**

Read full guide: `IMAGE_UPLOAD_SETUP_GUIDE.md`

Check your setup:
1. Is upload.php accessible? `https://yourdomain.com/api/upload.php`
2. Do secret keys match? Check `.env.local` and `upload.php`
3. Are env vars in Vercel? Check dashboard settings
4. Is uploads folder writable? Check permissions (755)

---

**🎯 Your image upload is now production-ready!**

No Vercel Blob. No complex SDKs. Just simple, reliable uploads to your Hostinger hosting.

