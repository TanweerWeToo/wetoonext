# 🖼️ Image Upload Setup Guide
## Next.js (Vercel) → Hostinger Shared Hosting

This guide explains how to set up image uploads from your Next.js admin panel (hosted on Vercel) to your Hostinger shared hosting account.

---

## 📋 **Architecture Overview**

```
┌─────────────────┐
│  Admin Panel    │
│  (Next.js/      │  User uploads file
│   Vercel)       │
└────────┬────────┘
         │
         │ 1. File selected in browser
         ▼
┌─────────────────┐
│  Next.js API    │  
│  /api/admin/    │  2. Validates file
│  upload-image   │     (type, size)
└────────┬────────┘
         │
         │ 3. Sends file via HTTP POST
         ▼
┌─────────────────┐
│  Hostinger PHP  │  4. Receives file
│  /api/upload.php│     Saves to /uploads/
└────────┬────────┘     Returns public URL
         │
         │ 5. Returns URL
         ▼
┌─────────────────┐
│  MySQL Database │  6. URL stored in
│  (Hostinger)    │     gallery/courses
└─────────────────┘     table
```

---

## ✅ **Step 1: Set Up Hostinger (PHP Upload Script)**

### 1.1 Upload PHP Script to Hostinger

1. **Login to your Hostinger hosting account**
2. **Open File Manager** (or use FTP client like FileZilla)
3. **Navigate to:** `public_html/`
4. **Create folders:**
   - `public_html/api/` (if not exists)
   - `public_html/uploads/` (if not exists)
5. **Upload** `hostinger_upload_script/upload.php` to `public_html/api/`
6. **Set permissions:**
   - `public_html/api/upload.php` → **644** (rw-r--r--)
   - `public_html/uploads/` → **755** (rwxr-xr-x)

### 1.2 Configure upload.php

**Edit `public_html/api/upload.php` and change these lines:**

```php
// Line 15: Change this to a secure random string
$uploadSecret = 'your_secure_secret_key_here';

// Line 89: Change to your actual domain
$baseUrl = 'https://yourdomain.com';
```

**Example:**
```php
$uploadSecret = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
$baseUrl = 'https://wetoomedia.com';
```

### 1.3 Test the Upload Endpoint

Visit: `https://yourdomain.com/api/upload.php`

**Expected response:**
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

If you see this, the script is working! ✅

---

## ✅ **Step 2: Configure Next.js (Vercel)**

### 2.1 Add Environment Variables

Create or edit `.env.local` in your Next.js project root:

```bash
# Hostinger Upload Configuration
HOSTINGER_UPLOAD_URL=https://yourdomain.com/api/upload.php
UPLOAD_SECRET_KEY=your_secure_secret_key_here
```

**⚠️ IMPORTANT:** The `UPLOAD_SECRET_KEY` must match the one in `upload.php`!

**Example:**
```bash
HOSTINGER_UPLOAD_URL=https://wetoomedia.com/api/upload.php
UPLOAD_SECRET_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

### 2.2 Add Environment Variables to Vercel

1. **Go to:** Vercel Dashboard → Your Project → Settings → Environment Variables
2. **Add:**
   - `HOSTINGER_UPLOAD_URL` = `https://yourdomain.com/api/upload.php`
   - `UPLOAD_SECRET_KEY` = `your_secure_secret_key_here`
3. **Redeploy** your project

---

## ✅ **Step 3: Test the Upload System**

### 3.1 Local Testing

1. **Start dev server:**
   ```bash
   pnpm dev
   ```

2. **Navigate to:** `http://localhost:3000/admin/gallery`
3. **Try uploading an image:**
   - Click "Add Image"
   - Select a file (JPEG, PNG, GIF, or WebP)
   - Click "Add Image"
   
**Expected behavior:**
- Shows "Uploading..." button state
- Uploads file to Hostinger
- File saved to: `public_html/uploads/gallery/`
- Shows success toast: "Image uploaded successfully"
- Image appears in gallery

### 3.2 Production Testing

1. **Deploy to Vercel** (if not already deployed)
2. **Visit:** `https://your-vercel-domain.com/admin/gallery`
3. **Test upload** (same steps as local)

---

## 🔒 **Security Features**

### Implemented Security Measures:

1. ✅ **Authentication Required**
   - Only logged-in admins can upload
   - JWT token validation

2. ✅ **Secret Key Protection**
   - PHP endpoint requires secret key
   - Prevents unauthorized uploads

3. ✅ **File Type Validation**
   - Only images allowed (JPEG, PNG, GIF, WebP)
   - Validated on both frontend and backend

4. ✅ **File Size Limit**
   - Maximum 5MB per file
   - Prevents abuse

5. ✅ **Unique Filenames**
   - Auto-generated: `folder_timestamp_random.ext`
   - Prevents overwriting

6. ✅ **CORS Protection**
   - Can be restricted to specific domains

### Additional Security Recommendations:

1. **Change CORS to your domain:**
   ```php
   // In upload.php line 7:
   header('Access-Control-Allow-Origin: https://your-vercel-domain.com');
   ```

2. **Use HTTPS only** (already enforced by Hostinger)

3. **Regularly rotate secret keys**

4. **Monitor uploads folder size**

---

## 📂 **File Structure After Setup**

### Hostinger (`public_html/`)
```
public_html/
├── api/
│   └── upload.php          ← PHP upload script
├── uploads/
│   ├── gallery/            ← Gallery images (auto-created)
│   │   ├── 1234567890_abc123.jpg
│   │   ├── 1234567891_def456.png
│   │   └── ...
│   ├── courses/            ← Course images (auto-created)
│   │   ├── 1234567892_ghi789.webp
│   │   ├── 1234567893_jkl012.jpg
│   │   └── ...
│   └── general/            ← Other uploads (optional)
│       └── ...
├── index.php
└── ...
```

### Next.js Project
```
src/
├── app/
│   ├── admin/
│   │   ├── gallery/
│   │   │   └── page.jsx      ← Updated with upload
│   │   └── courses/
│   │       └── page.jsx      ← Updated with upload
│   └── api/
│       └── admin/
│           └── upload-image/
│               └── route.js  ← Upload API route
└── ...
```

---

## 🛠️ **Usage**

### Gallery Upload
1. Navigate to `/admin/gallery`
2. Click "Add Image"
3. **Option A:** Upload file directly
4. **Option B:** Enter image URL
5. Add caption and display order
6. Click "Add Image"

### Course Image Upload
1. Navigate to `/admin/courses`
2. Click "Add Course"
3. Fill in course details
4. **Option A:** Upload course image
5. **Option B:** Enter image URL
6. Click "Create Course"

### Features:
- ✅ Drag & drop support
- ✅ Live preview before upload
- ✅ Progress feedback ("Uploading...")
- ✅ File info display (name, size)
- ✅ Automatic validation
- ✅ Error handling with toasts

---

## 🐛 **Troubleshooting**

### Error: "Unauthorized" (401)
**Cause:** Secret key mismatch or missing

**Fix:**
1. Check `upload.php` secret key matches `.env.local`
2. Verify environment variables in Vercel
3. Redeploy after changing env vars

---

### Error: "Failed to upload image"
**Cause:** PHP endpoint not accessible

**Fix:**
1. Check `https://yourdomain.com/api/upload.php` is accessible
2. Verify upload.php is in correct location
3. Check file permissions (644 for upload.php)
4. Check uploads folder exists and is writable (755)

---

### Error: "File too large"
**Cause:** File > 5MB

**Fix:**
1. Reduce image size before upload
2. Or increase limit in `upload.php` (line 28):
   ```php
   $maxFileSize = 10 * 1024 * 1024; // 10MB
   ```

---

### Error: "Invalid file type"
**Cause:** Unsupported file format

**Fix:**
- Only use: JPEG, JPG, PNG, GIF, WebP
- Convert other formats using online tools

---

### Uploads work locally but not in production
**Cause:** Environment variables not set in Vercel

**Fix:**
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add both `HOSTINGER_UPLOAD_URL` and `UPLOAD_SECRET_KEY`
3. Redeploy project

---

### Images upload but don't display
**Cause:** Incorrect base URL in upload.php

**Fix:**
1. Check `$baseUrl` in `upload.php` (line 89)
2. Should be: `https://yourdomain.com` (no trailing slash)
3. Make sure uploads folder is publicly accessible

---

### Permission denied error
**Cause:** Uploads folder not writable

**Fix:**
1. Connect via FTP/File Manager
2. Set `public_html/uploads/` permissions to **755**
3. If still fails, try **777** (less secure, use temporarily)

---

## 📊 **Technical Specifications**

### Supported File Types
- **JPEG/JPG** (.jpg, .jpeg)
- **PNG** (.png)
- **GIF** (.gif)
- **WebP** (.webp)

### File Size Limits
- **Maximum:** 5MB per file
- **Can be configured** in both Next.js API and PHP script

### Folder Structure
**Organized by type:**
- Gallery images → `uploads/gallery/`
- Course images → `uploads/courses/`
- Other uploads → `uploads/general/`

### Generated Filenames
**Format:** `{timestamp}_{random}.{extension}`

**Examples:**
- `1704123456_a1b2c3d4e5f6g7h8.jpg` (in gallery folder)
- `1704123457_h8g7f6e5d4c3b2a1.png` (in courses folder)

### Upload URL Format
**Returned URL:** `https://yourdomain.com/uploads/{folder}/{filename}`

**Examples:**
- `https://yourdomain.com/uploads/gallery/1704123456_abc.jpg`
- `https://yourdomain.com/uploads/courses/1704123457_def.png`

**Stored in MySQL:** Full URL for easy access

---

## ✅ **Success Checklist**

Before going live, verify:

- [ ] PHP script uploaded to `public_html/api/upload.php`
- [ ] Uploads folder created: `public_html/uploads/`
- [ ] Correct permissions set (644 for PHP, 755 for folder)
- [ ] Secret key configured in upload.php
- [ ] Base URL configured in upload.php
- [ ] Environment variables added to .env.local
- [ ] Environment variables added to Vercel
- [ ] Tested upload locally
- [ ] Tested upload in production
- [ ] Images display correctly on frontend

---

## 🎯 **Benefits of This Approach**

1. ✅ **No Vercel Blob costs** - All storage on your Hostinger
2. ✅ **Reliable** - Works with shared hosting
3. ✅ **Secure** - Authentication + secret key
4. ✅ **Flexible** - Easy to modify upload logic
5. ✅ **Simple** - No complex SDKs or services
6. ✅ **Production-ready** - Error handling included

---

## 📚 **Additional Resources**

### Generating Secure Keys
```bash
# Generate random secret key
openssl rand -hex 32
```

### FTP Clients
- **FileZilla** (recommended)
- **Cyberduck**
- **WinSCP** (Windows)

### Testing Tools
- **Postman** - Test PHP endpoint directly
- **Browser DevTools** - Monitor network requests

---

## 🆘 **Support**

If you encounter issues:

1. Check browser console for errors (F12)
2. Check Next.js server logs
3. Check Hostinger error logs (via cPanel)
4. Verify environment variables
5. Test PHP endpoint directly

---

**🎉 You're all set! Your image upload system is now fully functional.**

