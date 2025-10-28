# 🚀 Getting Started with WeToo Media Admin Panel

## 🎯 Quick Start (3 Steps)

### Step 1: Configure Environment
```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local and update these values:
# DB_PASSWORD=your_mysql_password
# JWT_SECRET=your_random_secret_key
```

### Step 2: Set Up Database
```bash
# Start MySQL (if not running)
# Windows: net start MySQL80
# Mac/Linux: sudo service mysql start

# Run the schema
mysql -u root -p < database/schema.sql
# Enter your MySQL password when prompted
```

### Step 3: Start Application
```bash
# Install dependencies (if not done)
npm install

# Start development server
npm run dev
```

**🎉 Done! Visit:** http://localhost:3000/admin/login

---

## 🔑 Default Login

```
Email: admin@wetoomedia.com
Password: Admin@123
```

**⚠️ Important:** Change this password immediately after first login!

---

## 📂 What You Have Now

### 1. **Complete Admin Panel** ✅
A beautiful, fully functional admin dashboard with:
- 📊 Dashboard with real-time stats
- 📝 Applications management
- 📚 Courses CRUD
- 🖼️ Gallery management
- 🎥 YouTube testimonials
- 📈 Program impact metrics

### 2. **Secure Authentication** ✅
- JWT-based authentication
- Encrypted passwords (bcrypt)
- Protected routes
- Session management

### 3. **Database Integration** ✅
- 6 MySQL tables ready to use
- Default data pre-loaded
- Proper indexing
- Clean schema

### 4. **Beautiful UI** ✅
- Responsive design (mobile, tablet, desktop)
- Smooth animations
- Modern components
- Professional look

---

## 🗺️ Navigation Guide

### Admin Routes
| URL | Description |
|-----|-------------|
| `/admin/login` | Login page |
| `/admin` | Dashboard |
| `/admin/applications` | View & manage registrations |
| `/admin/courses` | Add/edit/delete courses |
| `/admin/gallery` | Manage website images |
| `/admin/testimonials` | Manage YouTube videos |
| `/admin/program-impact` | Update success metrics |

---

## 📖 Documentation Files

| File | Purpose |
|------|---------|
| `ADMIN_SETUP_GUIDE.md` | Detailed setup instructions |
| `README_ADMIN.md` | Quick reference guide |
| `ADMIN_PANEL_SUMMARY.md` | Complete feature list |
| `SYSTEM_ARCHITECTURE.md` | Technical architecture |
| `GETTING_STARTED.md` | This file - quick start |

---

## 🎬 Demo Workflow

### As Admin, You Can:

**1. Manage Applications**
- View all student registrations
- Filter by course type
- Search by name/email/mobile
- Update status & payment
- Delete submissions

**2. Manage Courses**
- Create new courses
- Edit course details
- Upload course images
- Set RCA/UPSC/BPSC category
- Activate/deactivate courses

**3. Manage Gallery**
- Add new images (by URL)
- Edit captions
- Reorder images
- Delete images
- Preview in grid

**4. Manage Testimonials**
- Add YouTube videos
- Paste full URL or just video ID
- See video thumbnails
- Reorder for carousel
- Delete testimonials

**5. Update Impact Metrics**
- Edit metric names
- Update values
- See live preview
- Track last updated time

---

## 🎨 UI Components Used

**From shadcn/ui:**
- ✅ Table (data display)
- ✅ Dialog (modals)
- ✅ Button (actions)
- ✅ Input (forms)
- ✅ Select (dropdowns)
- ✅ Badge (status labels)
- ✅ Avatar (user profile)
- ✅ Card (containers)
- ✅ Dropdown Menu (navigation)

**From Framer Motion:**
- ✅ Page transitions
- ✅ Stagger animations
- ✅ Hover effects

---

## 🔧 Common Tasks

### Change Admin Password
```bash
# Generate new password hash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('NewPassword123', 10).then(hash => console.log(hash));"

# Update in MySQL
mysql -u root -p
USE wetoomedia_db;
UPDATE admin_users SET password = 'paste_hash_here' WHERE email = 'admin@wetoomedia.com';
```

### Add New Admin User
```sql
-- Generate password hash first (see above)
INSERT INTO admin_users (email, password, name) 
VALUES ('newemail@example.com', 'bcrypt_hash_here', 'Admin Name');
```

### Reset Database
```bash
mysql -u root -p wetoomedia_db < database/schema.sql
```

### Test Database Connection
```bash
node -e "require('./src/lib/db').testConnection()"
```

---

## 🐛 Troubleshooting

### Can't Login?
1. Check `.env.local` has correct `JWT_SECRET`
2. Verify admin user exists in database
3. Clear browser cookies
4. Try creating a new password hash

### Database Connection Failed?
1. Ensure MySQL is running
2. Check credentials in `.env.local`
3. Verify database `wetoomedia_db` exists
4. Test with: `mysql -u root -p`

### Module Not Found?
```bash
rm -rf node_modules package-lock.json
npm install
```

### Page Not Loading?
1. Check console for errors
2. Verify development server is running
3. Clear browser cache
4. Try incognito mode

---

## 📊 Database Tables

### Applications (Student Registrations)
Fields: full_name, father_name, email, mobile, dob, state, degree, subject, grad_year, optional_paper, comments, course_name, paid, status

### Courses (Course Management)
Fields: title, level, start_date, year, fee, image_url, category, is_active

### Gallery (Image Gallery)
Fields: image_url, caption, display_order

### Testimonials (YouTube Videos)
Fields: title, video_id, display_order, is_active

### Program Impact (Success Metrics)
Fields: metric_name, metric_value, display_order

### Admin Users (Authentication)
Fields: email, password (hashed), name

---

## 🚀 Next Steps

### Immediate Actions
1. ✅ Complete setup (Steps 1-3 above)
2. ✅ Login to admin panel
3. ✅ Change default password
4. ✅ Explore all modules
5. ✅ Test creating/editing/deleting

### Customization
- Add your logo to admin panel
- Customize color scheme
- Add more admin users
- Update default metrics

### Production Deployment
- Update environment variables
- Deploy to Vercel
- Use cloud MySQL (PlanetScale/AWS RDS)
- Enable HTTPS

---

## ✅ Checklist

Before going live, ensure:
- [ ] Changed default admin password
- [ ] Updated JWT_SECRET to secure random string
- [ ] Tested all CRUD operations
- [ ] Verified database backups
- [ ] Configured production database
- [ ] Updated environment variables
- [ ] Tested on mobile devices
- [ ] Verified SSL/HTTPS

---

## 📞 Need Help?

1. **Read Documentation**
   - Start with `ADMIN_SETUP_GUIDE.md`
   - Check `ADMIN_PANEL_SUMMARY.md` for features
   - Review `SYSTEM_ARCHITECTURE.md` for technical details

2. **Check Troubleshooting**
   - See common issues above
   - Check browser console for errors
   - Verify database connection

3. **Contact Support**
   - Email: wetoo.media@gmail.com
   - Phone: +91 9773573083

---

## 🎉 You're All Set!

Your admin panel is ready to manage:
- ✅ Student applications
- ✅ Course offerings
- ✅ Website gallery
- ✅ Video testimonials
- ✅ Success metrics

**Start managing your website dynamically! 🚀**

---

*Happy Administrating! 🎯*  
*© 2025 WeToo Media*

