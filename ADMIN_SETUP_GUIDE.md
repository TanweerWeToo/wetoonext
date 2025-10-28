# 🚀 WeToo Media Admin Panel - Setup Guide

## Overview
A comprehensive, fully functional Admin Panel built with **Next.js 16**, **MySQL**, **Tailwind CSS**, **shadcn/ui**, and **Framer Motion** for managing all sections of the WeToo Media website dynamically.

## ✨ Features

### 🔐 Admin Authentication
- Secure JWT-based authentication
- Protected admin routes with middleware
- Session management with HTTP-only cookies

### 📊 Dashboard Modules

#### 1. **Applications Management**
- View all student registration submissions
- Filter by course, status, and search by name/email/mobile
- Update application status (Pending/Reviewed/Accepted/Rejected)
- Toggle payment status
- View detailed application information
- Delete applications with confirmation

#### 2. **Courses Management (Full CRUD)**
- Create new courses with all details
- Edit existing courses
- Delete courses
- Upload course images
- Set course categories (RCA/UPSC/BPSC)
- Toggle active/inactive status

#### 3. **Gallery Management**
- Upload and manage gallery images
- Add captions to images
- Set display order
- Grid view with lightbox preview
- Edit and delete images

#### 4. **Testimonials (YouTube Videos)**
- Add YouTube video testimonials
- Support for video URL or video ID
- Video thumbnail previews
- Set display order for carousel
- Toggle active/inactive status
- Delete testimonials

#### 5. **Program Impact Metrics**
- Update success statistics
- Edit metric names and values
- Live preview of changes
- Displays: Success Rate, Candidates Selected, Aspirants Benefited, etc.

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** MySQL
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Authentication:** JWT + bcryptjs
- **Database Driver:** mysql2

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm or pnpm package manager

## 🚀 Installation & Setup

### Step 1: Install Dependencies

```bash
npm install
# or
pnpm install
```

### Step 2: Configure Environment Variables

Create a `.env.local` file in the root directory (use `.env.example` as template):

```env
# MySQL Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=wetoomedia_db
DB_PORT=3306

# JWT Secret for Admin Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Admin Credentials
ADMIN_EMAIL=admin@wetoomedia.com
ADMIN_PASSWORD=Admin@123

# Next.js Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Important:** 
- Replace `your_mysql_password` with your actual MySQL password
- Generate a secure random string for `JWT_SECRET` in production
- Change the default admin password after first login

### Step 3: Set Up MySQL Database

1. **Start MySQL Server:**
   ```bash
   # Windows
   net start MySQL80
   
   # macOS/Linux
   sudo service mysql start
   ```

2. **Run the Database Schema:**
   
   Open MySQL command line or MySQL Workbench and execute:
   
   ```bash
   mysql -u root -p < database/schema.sql
   ```
   
   Or manually:
   ```sql
   source database/schema.sql
   ```

   This will:
   - Create the `wetoomedia_db` database
   - Create all required tables (admin_users, applications, courses, gallery, testimonials, program_impact)
   - Insert default data (courses, gallery images, testimonials, metrics)
   - Create default admin user

### Step 4: Test Database Connection

Create a test file to verify the connection:

```bash
node -e "require('./src/lib/db').testConnection()"
```

You should see: `✅ Database connected successfully`

### Step 5: Run the Development Server

```bash
npm run dev
# or
pnpm dev
```

The application will start at `http://localhost:3000`

## 🔑 Accessing the Admin Panel

1. Navigate to: **http://localhost:3000/admin/login**

2. **Default Login Credentials:**
   - Email: `admin@wetoomedia.com`
   - Password: `Admin@123`

3. After successful login, you'll be redirected to the admin dashboard

## 📁 Project Structure

```
wetoomedia/
├── database/
│   └── schema.sql                 # MySQL database schema
├── src/
│   ├── app/
│   │   ├── admin/                 # Admin panel pages
│   │   │   ├── layout.jsx         # Admin layout with sidebar
│   │   │   ├── page.jsx           # Dashboard
│   │   │   ├── login/page.jsx     # Login page
│   │   │   ├── applications/page.jsx
│   │   │   ├── courses/page.jsx
│   │   │   ├── gallery/page.jsx
│   │   │   ├── testimonials/page.jsx
│   │   │   └── program-impact/page.jsx
│   │   ├── api/
│   │   │   ├── applications/route.js  # Public API for form submissions
│   │   │   └── admin/             # Protected admin APIs
│   │   │       ├── auth/
│   │   │       │   ├── login/route.js
│   │   │       │   ├── logout/route.js
│   │   │       │   └── me/route.js
│   │   │       ├── applications/route.js
│   │   │       ├── courses/route.js
│   │   │       ├── gallery/route.js
│   │   │       ├── testimonials/route.js
│   │   │       └── program-impact/route.js
│   │   └── page.jsx               # Main website
│   ├── components/
│   │   └── ui/                    # shadcn/ui components
│   ├── lib/
│   │   ├── db.js                  # MySQL connection
│   │   ├── auth.js                # Authentication utilities
│   │   └── utils.js               # Utility functions
│   ├── middleware.js              # Route protection middleware
│   └── pages/                     # Website pages/components
└── .env.local                     # Environment variables
```

## 🔐 Security Features

1. **Password Hashing:** All passwords are hashed using bcrypt
2. **JWT Authentication:** Secure token-based authentication
3. **HTTP-only Cookies:** Session tokens stored in HTTP-only cookies
4. **Route Protection:** Middleware protects all admin routes
5. **API Security:** All admin API routes require valid authentication

## 📊 Database Schema

### Tables Created:

1. **admin_users** - Admin authentication
2. **applications** - Student registration forms
3. **courses** - Course/batch information
4. **gallery** - Website gallery images
5. **testimonials** - YouTube video testimonials
6. **program_impact** - Success metrics

## 🎨 UI Features

- **Responsive Design:** Works on all devices (mobile, tablet, desktop)
- **Modern UI:** Clean, professional interface with Tailwind CSS
- **Smooth Animations:** Framer Motion for delightful interactions
- **Toast Notifications:** Real-time feedback for all actions
- **Confirmation Dialogs:** Prevent accidental deletions
- **Loading States:** Clear feedback during async operations

## 🔧 Configuration Options

### Changing Admin Password

1. **Via Database:**
   ```sql
   UPDATE admin_users 
   SET password = '$2b$10$newHashHere' 
   WHERE email = 'admin@wetoomedia.com';
   ```

2. **Generate New Hash:**
   ```bash
   node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('YourNewPassword', 10).then(hash => console.log(hash));"
   ```

### Adding More Admin Users

```sql
INSERT INTO admin_users (email, password, name) 
VALUES ('newemail@example.com', 'bcrypt_hash_here', 'Admin Name');
```

## 🚀 Deployment

### Environment Variables for Production

Update your `.env.local` with production values:

```env
DB_HOST=your-production-db-host
DB_USER=your-production-db-user
DB_PASSWORD=your-production-db-password
DB_NAME=wetoomedia_db
JWT_SECRET=very-secure-random-string-at-least-32-chars
NEXT_PUBLIC_API_URL=https://yourdomain.com
```

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

1. Push your code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

**Note:** For MySQL on Vercel, you'll need a cloud MySQL service like:
- PlanetScale
- AWS RDS
- Digital Ocean Managed Databases

## 📝 API Endpoints

### Public Endpoints
- `POST /api/applications` - Submit application form

### Admin Endpoints (Require Authentication)
- `POST /api/admin/auth/login` - Admin login
- `POST /api/admin/auth/logout` - Admin logout
- `GET /api/admin/auth/me` - Get current admin
- `GET /api/admin/applications` - Get all applications
- `PUT /api/admin/applications` - Update application
- `DELETE /api/admin/applications?id=X` - Delete application
- `GET/POST/PUT/DELETE /api/admin/courses` - Courses CRUD
- `GET/POST/PUT/DELETE /api/admin/gallery` - Gallery CRUD
- `GET/POST/PUT/DELETE /api/admin/testimonials` - Testimonials CRUD
- `GET/PUT /api/admin/program-impact` - Program Impact metrics

## 🐛 Troubleshooting

### Database Connection Issues

1. Verify MySQL is running:
   ```bash
   mysql -u root -p
   ```

2. Check credentials in `.env.local`

3. Ensure database exists:
   ```sql
   SHOW DATABASES;
   ```

### Authentication Issues

1. Clear browser cookies
2. Check JWT_SECRET in `.env.local`
3. Verify admin user exists in database:
   ```sql
   SELECT * FROM admin_users;
   ```

### Module Not Found Errors

```bash
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

For issues or questions:
- Email: wetoo.media@gmail.com
- Phone: +91 9773573083

## 📄 License

© 2025 WeToo Media. All rights reserved.

---

## ✅ Quick Start Checklist

- [ ] Install dependencies
- [ ] Create `.env.local` file
- [ ] Start MySQL server
- [ ] Run `database/schema.sql`
- [ ] Test database connection
- [ ] Start dev server
- [ ] Access admin panel at `/admin/login`
- [ ] Login with default credentials
- [ ] Change default password
- [ ] Test all modules

---

**🎉 Congratulations! Your admin panel is ready to use!**

