# ✅ Separate Folders for Gallery & Courses - COMPLETE

## 🎯 What Changed

Your uploads are now organized into **separate folders** on Hostinger:

```
📁 public_html/uploads/
    ├── 📁 gallery/          ← All gallery images here
    ├── 📁 courses/          ← All course images here
    └── 📁 general/          ← Other uploads (if needed)
```

---

## 🔄 Upload Flow

### **Gallery Upload:**
```
Admin Panel (/admin/gallery)
    ↓
Select file: photo.jpg
    ↓
Next.js API sends: folder='gallery'
    ↓
Hostinger PHP: uploads/gallery/1704123456_abc.jpg
    ↓
Returns URL: https://domain.com/uploads/gallery/1704123456_abc.jpg
    ↓
Saved in MySQL gallery table
    ↓
Displays on website
```

### **Courses Upload:**
```
Admin Panel (/admin/courses)
    ↓
Select file: course-banner.png
    ↓
Next.js API sends: folder='courses'
    ↓
Hostinger PHP: uploads/courses/1704123457_def.png
    ↓
Returns URL: https://domain.com/uploads/courses/1704123457_def.png
    ↓
Saved in MySQL courses table
    ↓
Displays on website
```

---

## 📊 Comparison

### **Before (Mixed):**
```
uploads/
├── gallery_1234_abc.jpg     } All mixed
├── courses_5678_def.png     } together
├── gallery_9012_ghi.webp    } in one
└── courses_3456_jkl.jpg     } folder
```

**Problems:**
- ❌ Hard to find specific images
- ❌ All images mixed together
- ❌ Difficult to backup selectively
- ❌ No organization

### **After (Organized):**
```
uploads/
├── gallery/
│   ├── 1234_abc.jpg         } Gallery
│   └── 9012_ghi.webp        } images only
├── courses/
│   ├── 5678_def.png         } Course
│   └── 3456_jkl.jpg         } images only
└── general/
    └── ...                  } Other uploads
```

**Benefits:**
- ✅ Easy to find images by type
- ✅ Clean organization
- ✅ Selective backup/cleanup
- ✅ Better file management

---

## 🚀 Setup (3 Steps)

### **Step 1: Upload New PHP Script**
- Upload updated `upload.php` to `public_html/api/`
- Replaces old version
- Folders created automatically on first upload

### **Step 2: No Frontend Changes!**
- Gallery & Courses pages already send correct folder names
- Everything works automatically
- No code changes needed

### **Step 3: Test**
- Upload image in `/admin/gallery`
- Check: `public_html/uploads/gallery/` (folder created)
- Upload image in `/admin/courses`
- Check: `public_html/uploads/courses/` (folder created)

---

## 📁 File Structure

### **On Hostinger:**
```
public_html/
├── api/
│   └── upload.php           ← Updated script
│
├── uploads/
│   ├── gallery/             ← Auto-created
│   │   ├── 1704123456_a1b2c3d4.jpg
│   │   ├── 1704123457_e5f6g7h8.png
│   │   └── 1704123458_i9j0k1l2.webp
│   │
│   ├── courses/             ← Auto-created
│   │   ├── 1704123459_m3n4o5p6.jpg
│   │   ├── 1704123460_q7r8s9t0.png
│   │   └── 1704123461_u1v2w3x4.webp
│   │
│   └── general/             ← Optional
│       └── ...
```

### **Permissions:**
- `upload.php` → **644** (rw-r--r--)
- `uploads/` → **755** (rwxr-xr-x)
- `uploads/gallery/` → **755** (rwxr-xr-x)
- `uploads/courses/` → **755** (rwxr-xr-x)

---

## 🔗 URL Format

### **Gallery Images:**
```
https://yourdomain.com/uploads/gallery/1704123456_abc123.jpg
                                 ↑
                            Folder path
```

### **Course Images:**
```
https://yourdomain.com/uploads/courses/1704123456_def456.png
                                 ↑
                            Folder path
```

---

## 🔒 Security

**Folder Validation:**
```php
$allowedFolders = ['gallery', 'courses', 'general'];
```

Only these 3 folders are allowed. Any other folder name is rejected:

```json
{
  "success": false,
  "message": "Invalid folder. Allowed: gallery, courses, general"
}
```

This prevents:
- ❌ Creating random folders
- ❌ Directory traversal attacks
- ❌ Unauthorized folder access

---

## 📝 Filename Format

### **Old (With Prefix):**
```
gallery_1704123456_a1b2c3d4e5f6g7h8.jpg
courses_1704123456_a1b2c3d4e5f6g7h8.jpg
```

### **New (Without Prefix):**
```
1704123456_a1b2c3d4e5f6g7h8.jpg  (in gallery/ folder)
1704123456_a1b2c3d4e5f6g7h8.jpg  (in courses/ folder)
```

**Why?**
- Shorter filenames
- Folder indicates type (no need for prefix)
- Cleaner URLs

---

## 💾 Storage Management

### **Check Folder Sizes:**

**Via Hostinger File Manager:**
1. Navigate to `uploads/`
2. Right-click `gallery/` → Properties
3. Right-click `courses/` → Properties

**Via SSH:**
```bash
du -sh uploads/gallery/
du -sh uploads/courses/
```

### **Backup Individual Folders:**

**Gallery only:**
```bash
zip -r gallery-backup.zip uploads/gallery/
```

**Courses only:**
```bash
zip -r courses-backup.zip uploads/courses/
```

**Both:**
```bash
zip -r images-backup.zip uploads/gallery/ uploads/courses/
```

---

## ✅ What You Get

### **Better Organization:**
- ✅ Gallery images in one place
- ✅ Course images in another
- ✅ Easy to navigate
- ✅ Professional structure

### **Easier Management:**
- ✅ Backup specific types
- ✅ Delete old galleries separately
- ✅ Monitor storage per category
- ✅ Set different permissions if needed

### **Same Functionality:**
- ✅ Upload still works the same
- ✅ No frontend changes
- ✅ Auto-folder creation
- ✅ Full validation

---

## 🐛 Troubleshooting

### **Folders not created?**
```bash
# Check uploads folder permissions
ls -la public_html/ | grep uploads

# Should be: drwxr-xr-x (755)
```

**Fix:**
```bash
chmod 755 public_html/uploads/
```

### **Images upload but wrong folder?**
Check frontend code sends correct folder:
- Gallery: `folder='gallery'`
- Courses: `folder='courses'`

### **Old images broken?**
Old URLs still work if files remain in root `uploads/` folder.

To keep old images working:
- Don't delete files from root `uploads/`
- New uploads go to subfolders
- Both URL formats work simultaneously

---

## 📊 Example URLs

### **Before Update:**
```
https://yourdomain.com/uploads/gallery_1704123456_abc.jpg
https://yourdomain.com/uploads/courses_1704123456_def.jpg
```

### **After Update:**
```
https://yourdomain.com/uploads/gallery/1704123456_abc.jpg
https://yourdomain.com/uploads/courses/1704123456_def.jpg
```

---

## 🎯 Benefits Summary

| Aspect | Before | After |
|--------|--------|-------|
| **Organization** | ❌ All mixed | ✅ Separated by type |
| **Findability** | ❌ Hard to find | ✅ Easy to locate |
| **Backup** | ❌ All or nothing | ✅ Selective backup |
| **Cleanup** | ❌ Risk deleting wrong files | ✅ Safe cleanup by folder |
| **Management** | ❌ Confusing | ✅ Clear structure |
| **URLs** | Long with prefix | Clean, organized |

---

## 📋 Migration Guide (If Needed)

If you have existing images in old format:

### **Option 1: Keep Both** (Recommended)
- Leave old images in root `uploads/`
- New uploads go to subfolders
- Both URL formats work
- Migrate gradually

### **Option 2: Full Migration**
1. Create `gallery/` and `courses/` folders
2. Move files to respective folders
3. Update MySQL URLs:
```sql
UPDATE gallery 
SET image_url = REPLACE(
    image_url, 
    '/uploads/gallery_', 
    '/uploads/gallery/'
);

UPDATE courses 
SET image_url = REPLACE(
    image_url, 
    '/uploads/courses_', 
    '/uploads/courses/'
);
```

---

## 🎉 Status: COMPLETE

Your image uploads are now **perfectly organized**:

✅ **Gallery** → `uploads/gallery/`  
✅ **Courses** → `uploads/courses/`  
✅ **Auto-creation** of folders  
✅ **Validation** & security  
✅ **No frontend changes** needed  
✅ **Production ready**

---

## 📞 Quick Reference

**Upload Locations:**
- Gallery: `public_html/uploads/gallery/`
- Courses: `public_html/uploads/courses/`

**URL Format:**
- Gallery: `https://domain.com/uploads/gallery/{filename}`
- Courses: `https://domain.com/uploads/courses/{filename}`

**Allowed Folders:**
- `gallery`
- `courses`
- `general`

**File Modified:**
- `hostinger_upload_script/upload.php` ✅

**Frontend:**
- No changes needed ✅

---

**🎊 Your images are now organized by type with separate folders!**

