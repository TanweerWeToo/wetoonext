# 📁 Separate Folders Setup for Gallery & Courses Images

## Overview
Images from **Gallery** and **Courses** will now be uploaded to separate folders on Hostinger for better organization.

---

## 📂 Folder Structure on Hostinger

```
public_html/
├── api/
│   └── upload.php
└── uploads/
    ├── gallery/          ← Gallery images here
    │   ├── 1704123456_a1b2c3d4.jpg
    │   ├── 1704123457_e5f6g7h8.png
    │   └── ...
    ├── courses/          ← Course images here
    │   ├── 1704123458_i9j0k1l2.jpg
    │   ├── 1704123459_m3n4o5p6.webp
    │   └── ...
    └── general/          ← Other uploads (if any)
        └── ...
```

---

## ✅ **Setup Instructions**

### **Step 1: Upload Updated PHP Script**

1. **Download the updated** `hostinger_upload_script/upload.php`
2. **Login** to Hostinger File Manager (or FTP)
3. **Navigate to:** `public_html/api/`
4. **Replace** the old `upload.php` with the new one
5. **Set permissions:** **644** (rw-r--r--)

### **Step 2: Create Folder Structure**

The PHP script will **auto-create** these folders when first upload happens, but you can create them manually:

1. **Navigate to:** `public_html/uploads/`
2. **Create folders:**
   - `gallery/`
   - `courses/`
   - `general/` (optional)
3. **Set permissions:** **755** (rwxr-xr-x) for each folder

**Or let the script create them automatically** - it will create folders as needed!

### **Step 3: Update Configuration**

**Edit `upload.php` (line 128):**

```php
$baseUrl = 'https://yourdomain.com'; // Change to your domain
```

**Example:**
```php
$baseUrl = 'https://wetoomedia.com';
```

### **Step 4: Test the Setup**

1. **Start your Next.js dev server:**
   ```bash
   pnpm dev
   ```

2. **Test Gallery Upload:**
   - Go to `/admin/gallery`
   - Upload an image
   - ✅ Should save to: `public_html/uploads/gallery/`
   - ✅ URL format: `https://yourdomain.com/uploads/gallery/1234567890_abc123.jpg`

3. **Test Courses Upload:**
   - Go to `/admin/courses`
   - Upload an image
   - ✅ Should save to: `public_html/uploads/courses/`
   - ✅ URL format: `https://yourdomain.com/uploads/courses/1234567890_def456.jpg`

---

## 🔄 **What Changed**

### **Before (Single Folder):**
```
uploads/
├── gallery_1234567890_abc.jpg    ← All mixed together
├── courses_1234567891_def.jpg
├── gallery_1234567892_ghi.png
└── courses_1234567893_jkl.webp
```

**URL Example:**
```
https://yourdomain.com/uploads/gallery_1234567890_abc.jpg
```

### **After (Separate Folders):**
```
uploads/
├── gallery/
│   ├── 1234567890_abc.jpg        ← Gallery images
│   └── 1234567892_ghi.png
└── courses/
    ├── 1234567891_def.jpg        ← Course images
    └── 1234567893_jkl.webp
```

**URL Example:**
```
https://yourdomain.com/uploads/gallery/1234567890_abc.jpg
https://yourdomain.com/uploads/courses/1234567891_def.jpg
```

---

## 🎯 **Benefits**

1. ✅ **Better Organization** - Easy to find images by type
2. ✅ **Easy Backup** - Backup specific folders separately
3. ✅ **Easy Cleanup** - Delete old gallery/course images independently
4. ✅ **Better Permissions** - Set different permissions per folder if needed
5. ✅ **Statistics** - Know how many images per category
6. ✅ **Migration Ready** - Easy to move to CDN later

---

## 📊 **Filename Changes**

### **Old Format:**
```
gallery_1704123456_a1b2c3d4e5f6g7h8.jpg
courses_1704123456_a1b2c3d4e5f6g7h8.jpg
```

### **New Format:**
```
1704123456_a1b2c3d4e5f6g7h8.jpg  (in gallery folder)
1704123456_a1b2c3d4e5f6g7h8.jpg  (in courses folder)
```

**Folder determines the type** - No need for prefix in filename!

---

## 🔒 **Security**

The PHP script validates folder names:

```php
$allowedFolders = ['gallery', 'courses', 'general'];
```

**Only these folders are allowed.** Any other folder name will be rejected with:
```json
{
  "success": false,
  "message": "Invalid folder. Allowed: gallery, courses, general"
}
```

This prevents malicious users from creating arbitrary folders.

---

## 🛠️ **How It Works**

### **Frontend (No Changes Needed!)**

Your admin panels already send the folder parameter:

**Gallery:**
```javascript
uploadFormData.append('folder', 'gallery');
```

**Courses:**
```javascript
uploadFormData.append('folder', 'courses');
```

### **Backend (PHP Script)**

1. Receives `folder` parameter from request
2. Validates folder name (gallery, courses, or general)
3. Creates folder if it doesn't exist: `uploads/{folder}/`
4. Saves file to: `uploads/{folder}/timestamp_random.ext`
5. Returns URL: `https://domain.com/uploads/{folder}/filename.ext`

---

## 📋 **Migration from Old Structure (Optional)**

If you have existing images in the old format (`gallery_*.jpg` in root uploads folder), you can migrate them:

### **Option A: Manual via File Manager**

1. Login to Hostinger File Manager
2. Go to `public_html/uploads/`
3. Create `gallery/` and `courses/` folders
4. Move files:
   - `gallery_*.jpg` → `uploads/gallery/` (remove prefix)
   - `courses_*.jpg` → `uploads/courses/` (remove prefix)
5. Update MySQL URLs:
   ```sql
   -- Update gallery URLs
   UPDATE gallery 
   SET image_url = REPLACE(image_url, '/uploads/gallery_', '/uploads/gallery/')
   WHERE image_url LIKE '%/uploads/gallery_%';
   
   -- Update courses URLs
   UPDATE courses 
   SET image_url = REPLACE(image_url, '/uploads/courses_', '/uploads/courses/')
   WHERE image_url LIKE '%/uploads/courses_%';
   ```

### **Option B: Keep Old Files, Use New Structure**

- Leave existing files as-is (they'll still work)
- New uploads use separate folders
- Gradually replace old images

---

## ✅ **Verification Checklist**

After setup, verify:

- [ ] `upload.php` uploaded to `public_html/api/`
- [ ] Base URL configured in `upload.php`
- [ ] Secret key configured in `upload.php`
- [ ] Environment variables set in `.env.local`
- [ ] Environment variables set in Vercel
- [ ] Gallery upload creates `uploads/gallery/` folder
- [ ] Courses upload creates `uploads/courses/` folder
- [ ] Gallery images accessible: `https://domain.com/uploads/gallery/file.jpg`
- [ ] Courses images accessible: `https://domain.com/uploads/courses/file.jpg`
- [ ] Old images still work (if applicable)

---

## 🐛 **Troubleshooting**

### **Error: "Invalid folder"**
**Cause:** Folder name not in allowed list  
**Fix:** Check that frontend sends 'gallery', 'courses', or 'general'

### **Folder not created automatically**
**Cause:** Permission issues  
**Fix:** 
1. Manually create folders via File Manager
2. Set permissions to **755**
3. Ensure `uploads/` folder itself is writable

### **Images upload but don't display**
**Cause:** Incorrect URL path  
**Fix:** Check `$baseUrl` in `upload.php` (line 128)

### **Old images broken after update**
**Cause:** URL structure changed  
**Fix:** 
- Keep old files in root uploads folder
- OR migrate URLs in database (see Migration section)

---

## 📊 **Folder Size Management**

### **Check Folder Sizes:**

Via SSH/Terminal:
```bash
du -sh /home/username/public_html/uploads/gallery/
du -sh /home/username/public_html/uploads/courses/
```

Via File Manager:
- Right-click folder → Properties

### **Backup Strategy:**

**Gallery:**
```bash
# Download only gallery images
scp -r user@host:public_html/uploads/gallery/ ./backup/gallery/
```

**Courses:**
```bash
# Download only course images
scp -r user@host:public_html/uploads/courses/ ./backup/courses/
```

---

## 🎉 **Summary**

Your image uploads are now organized:

- ✅ **Gallery** images → `uploads/gallery/`
- ✅ **Courses** images → `uploads/courses/`
- ✅ **Auto-creation** of folders
- ✅ **Validation** prevents invalid folders
- ✅ **No frontend changes** needed
- ✅ **Production ready**

---

## 📞 **Need Help?**

Common issues:
1. Make sure you uploaded the **updated** `upload.php`
2. Folders will be created automatically on first upload
3. URL format is: `https://domain.com/uploads/{folder}/{filename}`
4. Old images (without folder) still work from root uploads

---

**🎊 Your images are now perfectly organized by type!**

