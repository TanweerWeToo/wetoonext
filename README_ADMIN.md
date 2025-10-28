# Admin Panel Quick Reference

## 🔗 Quick Links

- **Admin Login:** http://localhost:3000/admin/login
- **Dashboard:** http://localhost:3000/admin
- **Main Website:** http://localhost:3000

## 🔑 Default Credentials

```
Email: admin@wetoomedia.com
Password: Admin@123
```

**⚠️ Change these credentials after first login!**

## 📊 Admin Modules

| Module | Route | Description |
|--------|-------|-------------|
| Dashboard | `/admin` | Overview & quick actions |
| Applications | `/admin/applications` | Manage student registrations |
| Courses | `/admin/courses` | CRUD operations for courses |
| Gallery | `/admin/gallery` | Manage website images |
| Testimonials | `/admin/testimonials` | YouTube video testimonials |
| Program Impact | `/admin/program-impact` | Update success metrics |

## 🛠️ Common Tasks

### Start Development Server
```bash
npm run dev
```

### Test Database Connection
```bash
node -e "require('./src/lib/db').testConnection()"
```

### Generate Password Hash
```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('YourPassword', 10).then(hash => console.log(hash));"
```

### Reset Database
```bash
mysql -u root -p wetoomedia_db < database/schema.sql
```

## 📝 Environment Variables

Copy `.env.example` to `.env.local` and update:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=wetoomedia_db
JWT_SECRET=your_secret_key
```

## 🎯 Features at a Glance

✅ Secure JWT authentication  
✅ Full CRUD for all modules  
✅ Responsive design  
✅ Real-time updates  
✅ Data validation  
✅ Toast notifications  
✅ Confirmation dialogs  
✅ Search & filter  
✅ Framer Motion animations  

## 🔧 Need Help?

See `ADMIN_SETUP_GUIDE.md` for detailed instructions.

