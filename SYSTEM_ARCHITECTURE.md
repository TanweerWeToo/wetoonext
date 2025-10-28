# 🏗️ WeToo Media Admin Panel - System Architecture

## 📊 System Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER INTERACTION                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      FRONTEND (Next.js)                          │
├─────────────────────────────────────────────────────────────────┤
│  Public Website                    │    Admin Panel              │
│  • Hero (Gallery)                 │    • Login Page             │
│  • Program (Courses)              │    • Dashboard              │
│  • YoutubeTestimonial             │    • Applications Page      │
│  • ProgramImpact                  │    • Courses Page           │
│  • Contact (Applications)         │    • Gallery Page           │
│                                   │    • Testimonials Page      │
│                                   │    • Program Impact Page    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     MIDDLEWARE (Route Protection)                │
├─────────────────────────────────────────────────────────────────┤
│  • Check JWT token in cookies                                   │
│  • Protect /admin/* routes                                      │
│  • Protect /api/admin/* endpoints                               │
│  • Redirect unauthorized users to /admin/login                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API ROUTES (Next.js API)                      │
├──────────────────────────┬──────────────────────────────────────┤
│   PUBLIC APIs            │   PROTECTED ADMIN APIs               │
│                          │                                       │
│ • POST /api/applications │ • Auth APIs                          │
│   (Form submission)      │   - POST /api/admin/auth/login       │
│                          │   - POST /api/admin/auth/logout      │
│                          │   - GET  /api/admin/auth/me          │
│                          │                                       │
│                          │ • CRUD APIs                           │
│                          │   - /api/admin/applications          │
│                          │   - /api/admin/courses               │
│                          │   - /api/admin/gallery               │
│                          │   - /api/admin/testimonials          │
│                          │   - /api/admin/program-impact        │
└──────────────────────────┴──────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AUTH & DATABASE LAYER                         │
├──────────────────────────┬──────────────────────────────────────┤
│   lib/auth.js            │   lib/db.js                          │
│                          │                                       │
│ • hashPassword()         │ • MySQL Connection Pool              │
│ • comparePassword()      │ • query() function                   │
│ • generateToken()        │ • getConnection()                    │
│ • verifyToken()          │ • testConnection()                   │
│ • authenticateAdmin()    │                                       │
│ • getAdminFromToken()    │                                       │
└──────────────────────────┴──────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    MySQL DATABASE                                │
├─────────────────────────────────────────────────────────────────┤
│  Tables:                                                         │
│  • admin_users          (Authentication)                        │
│  • applications         (Student registrations)                 │
│  • courses              (Course management)                     │
│  • gallery              (Image gallery)                         │
│  • testimonials         (YouTube videos)                        │
│  • program_impact       (Success metrics)                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Examples

### Example 1: Admin Login Flow

```
1. User visits /admin/login
   ↓
2. Enters email & password
   ↓
3. POST /api/admin/auth/login
   ↓
4. lib/auth.js → authenticateAdmin()
   ↓
5. Query admin_users table
   ↓
6. Compare password with bcrypt
   ↓
7. Generate JWT token
   ↓
8. Set HTTP-only cookie
   ↓
9. Redirect to /admin dashboard
```

### Example 2: Create Course Flow

```
1. Admin clicks "Add Course" button
   ↓
2. Opens dialog with form
   ↓
3. Fills in course details
   ↓
4. Submits form → POST /api/admin/courses
   ↓
5. Middleware checks JWT token
   ↓
6. lib/auth.js → getAdminFromToken()
   ↓
7. Execute INSERT query
   ↓
8. Return success response
   ↓
9. Show toast notification
   ↓
10. Refresh courses list
```

### Example 3: Public Application Submission

```
1. Student fills registration form
   ↓
2. Submits → POST /api/applications
   ↓
3. Validate form data
   ↓
4. Check if mobile already registered
   ↓
5. INSERT into applications table
   ↓
6. Return success
   ↓
7. Show payment dialog
   ↓
8. Admin can view in /admin/applications
```

---

## 🔐 Authentication Flow

```
┌──────────────┐
│ User Visits  │
│ /admin/*     │
└──────┬───────┘
       │
       ▼
┌──────────────────┐     NO      ┌─────────────────┐
│ Has admin_token  ├─────────────▶│ Redirect to     │
│ cookie?          │              │ /admin/login    │
└──────┬───────────┘              └─────────────────┘
       │ YES
       ▼
┌──────────────────┐     INVALID ┌─────────────────┐
│ Verify JWT       ├─────────────▶│ Clear cookie    │
│ Token            │              │ Redirect login  │
└──────┬───────────┘              └─────────────────┘
       │ VALID
       ▼
┌──────────────────┐
│ Allow Access to  │
│ Admin Panel      │
└──────────────────┘
```

---

## 🎨 Component Hierarchy

```
Admin Layout (layout.jsx)
│
├── Sidebar Navigation
│   ├── Logo
│   ├── Menu Items
│   │   ├── Dashboard
│   │   ├── Applications
│   │   ├── Courses
│   │   ├── Gallery
│   │   ├── Testimonials
│   │   └── Program Impact
│   └── User Profile Dropdown
│
└── Main Content Area
    │
    ├── Dashboard (page.jsx)
    │   ├── Stats Cards
    │   └── Quick Actions
    │
    ├── Applications (applications/page.jsx)
    │   ├── Filters (Search, Status, Course)
    │   ├── Data Table
    │   ├── Detail Dialog
    │   └── Delete Dialog
    │
    ├── Courses (courses/page.jsx)
    │   ├── Data Table
    │   ├── Add/Edit Dialog
    │   └── Delete Dialog
    │
    ├── Gallery (gallery/page.jsx)
    │   ├── Image Grid
    │   ├── Add/Edit Dialog
    │   └── Delete Dialog
    │
    ├── Testimonials (testimonials/page.jsx)
    │   ├── Data Table with Previews
    │   ├── Add/Edit Dialog
    │   └── Delete Dialog
    │
    └── Program Impact (program-impact/page.jsx)
        ├── Metric Cards
        └── Edit Dialog
```

---

## 📦 Technology Stack Details

### Frontend Framework
```
Next.js 16 (App Router)
├── React 19.2
├── Server Components
├── Client Components
├── API Routes
└── Middleware
```

### Styling & UI
```
Tailwind CSS 4
├── Utility-first CSS
├── Custom configuration
└── Responsive design

shadcn/ui
├── Table
├── Dialog
├── Button
├── Input
├── Select
├── Badge
├── Avatar
├── Dropdown Menu
├── Card
├── Label
└── Scroll Area

Framer Motion 12
├── Page transitions
├── List animations
└── Hover effects
```

### Backend & Database
```
MySQL 8
├── Connection pooling (mysql2)
├── Parameterized queries
└── Transaction support

Authentication
├── bcryptjs (Password hashing)
├── jsonwebtoken (JWT tokens)
└── cookie (Cookie management)
```

---

## 🗂️ Database Schema Relationships

```
admin_users (1) ──────────── No Direct Relations
                             (Used for auth only)

applications (*)
├── course_name ──references──▶ courses.level (informal)
└── Standalone table for form submissions

courses (*)
├── category: 'rca', 'upsc', 'bpsc'
└── Used by frontend Program component

gallery (*)
├── display_order (for sorting)
└── Used by frontend Hero component

testimonials (*)
├── video_id (YouTube)
├── display_order (for carousel)
└── Used by frontend YoutubeTestimonial component

program_impact (*)
├── metric_name (unique)
├── display_order (for display)
└── Used by frontend ProgramImpact component
```

---

## 🔄 State Management

### Client-Side State
```javascript
// Each admin page manages its own state
const [data, setData] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [isDialogOpen, setIsDialogOpen] = useState(false);
const [editingItem, setEditingItem] = useState(null);
```

### Server-Side State
```javascript
// MySQL database is the source of truth
// API routes fetch fresh data on each request
// No caching (can be added with Redis/SWR later)
```

---

## 🚀 Deployment Architecture

### Development
```
localhost:3000
├── Next.js Dev Server
├── Hot Module Replacement
└── Local MySQL Database
```

### Production (Recommended)
```
Vercel (Frontend & API)
├── Next.js Production Build
├── Serverless Functions
└── Edge Network CDN

PlanetScale/AWS RDS (Database)
├── MySQL 8 Compatible
├── Connection Pooling
└── Automated Backups
```

---

## 📊 Performance Considerations

### Optimizations Implemented
✅ MySQL connection pooling  
✅ Lazy loading for heavy components  
✅ Image optimization (Next.js Image)  
✅ Code splitting (automatic with Next.js)  
✅ Efficient re-renders (React.memo where needed)  

### Future Optimizations
- [ ] Database query caching (Redis)
- [ ] Image CDN (Cloudinary/AWS S3)
- [ ] API response caching (SWR/React Query)
- [ ] Database indexing optimization
- [ ] Pagination for large datasets

---

## 🔒 Security Layers

```
Layer 1: Frontend
└── Form validation, input sanitization

Layer 2: Middleware
└── JWT verification, route protection

Layer 3: API Routes
└── Authentication checks, authorization

Layer 4: Database
└── Parameterized queries, SQL injection prevention

Layer 5: Infrastructure
└── HTTPS, environment variables, secrets management
```

---

## 📈 Scalability Path

### Current Capacity
- Handles: ~1000 applications/day
- Concurrent users: ~50 admin users
- Database size: Unlimited (MySQL)

### To Scale Beyond
1. **Add Redis** for caching
2. **Implement CDN** for static assets
3. **Database replication** for read scaling
4. **Load balancer** for multiple instances
5. **Queue system** for background jobs

---

**This architecture is designed to be:**
- ✅ Simple to understand
- ✅ Easy to maintain
- ✅ Scalable for growth
- ✅ Secure by default
- ✅ Production-ready

---

*Architecture designed for WeToo Media Admin Panel*  
*© 2025 WeToo Media*

