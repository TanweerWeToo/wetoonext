# 🚀 Admin Panel - Quick Reference Guide

## 📍 All Admin Routes

### Main Dashboard
```
URL: /admin
Features: Overview stats, quick actions, activity tracking
```

### Applications
```
URL: /admin/applications
API: GET/PUT/DELETE /api/admin/applications
Database: applications
Features: View, filter, update status, delete submissions
```

### Courses
```
URL: /admin/courses
API: GET/POST/PUT/DELETE /api/admin/courses
Database: courses
Features: Full CRUD, image upload, search, pagination
```

### Gallery
```
URL: /admin/gallery
API: GET/POST/PUT/DELETE /api/admin/gallery
Database: gallery
Features: Image upload, captions, delete, grid view
```

### Video Testimonials (YouTube)
```
URL: /admin/testimonials
API: GET/POST/PUT/DELETE /api/admin/testimonials
Database: testimonials
Features: Add YouTube video IDs, manage order, delete
```

### Text Testimonials (NEW ✨)
```
URL: /admin/text-testimonials
API: GET/POST/PUT/DELETE /api/admin/text-testimonials
Database: text_testimonials
Features: Full CRUD, star ratings, avatar colors, live preview
```

### Program Impact (NEW ✨)
```
URL: /admin/program-impact-new
API: GET/PUT /api/admin/program-impact
Database: program_impact
Features: Edit 4 fixed metrics, live preview, color-coded cards
```

### YouTube Stats (NEW ✨)
```
URL: /admin/youtube-stats
API: GET/PUT /api/admin/youtube-stats
Database: youtube_stats
Features: Update channel stats, preview cards, formatting tips
```

---

## 🗂️ Database Tables

### New Tables Added
```sql
-- YouTube channel statistics
youtube_stats (
  id, subscribers, total_views, videos_count, 
  highest_single_video_views, updated_at
)

-- Text-based testimonials
text_testimonials (
  id, name, subtitle, rating, testimonial, 
  avatar_color, created_at, updated_at
)

-- Program impact metrics (4 fixed entries)
program_impact (
  id, title, value, description, 
  display_order, updated_at
)
```

### Existing Tables
```sql
admin_users, applications, courses, gallery, testimonials
```

---

## 🎨 UI Components Used

### shadcn/ui
- Card, CardContent, CardHeader, CardTitle, CardDescription
- Button (variants: default, ghost, outline, destructive)
- Input, Label, Textarea
- Dialog, DialogContent, DialogHeader, DialogFooter
- Select, SelectTrigger, SelectContent, SelectItem
- Table, TableHeader, TableBody, TableRow, TableCell
- Badge
- Avatar, AvatarFallback

### Icons (lucide-react)
- LayoutDashboard, FileText, BookOpen, Image
- MessageSquare, TrendingUp, Youtube
- Plus, Edit, Trash2, Eye, Star, Loader2
- Award, Users, Target, Clock

### Animations (framer-motion)
- Page transitions (fade, slide)
- Card hover effects (scale, lift)
- Staggered list animations
- Loading spinners

---

## 🔑 Common Operations

### Add New Item
1. Click "Add" button
2. Fill form in Dialog
3. Preview (if available)
4. Click "Create" or "Save"
5. Toast confirmation

### Edit Item
1. Click Edit icon
2. Form pre-filled in Dialog
3. Make changes
4. Preview updates live
5. Click "Update"
6. Toast confirmation

### Delete Item
1. Click Trash icon
2. Confirmation dialog appears
3. Click "Delete" to confirm
4. Toast confirmation

---

## 📊 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 🛠️ Setup Commands

### Install Dependencies
```bash
pnpm install
```

### Run Development Server
```bash
pnpm dev
```

### Build for Production
```bash
pnpm build
```

### Start Production Server
```bash
pnpm start
```

### Import Database Schema
```bash
mysql -u root -p u181984996_adminwetoo < database/new_sections_schema.sql
```

---

## 🔐 Authentication

All admin routes are protected by JWT middleware.

**Login:** `/admin/login`
**Cookie:** `admin_token`
**Duration:** Session-based

Protected routes automatically redirect to login if not authenticated.

---

## 🎯 Best Practices

### Data Entry
- Use consistent formatting (e.g., "10K+", "1M+")
- Keep descriptions concise
- Use high-quality images
- Proofread before saving

### Image Management
- Optimize images before upload
- Use descriptive captions
- Maintain consistent aspect ratios
- Delete unused images

### Testimonials
- Verify YouTube video IDs work
- Check rating accuracy (1-5 stars)
- Use professional language
- Update regularly

### Stats & Metrics
- Update monthly or quarterly
- Use round numbers (98% vs 97.8%)
- Keep format consistent
- Highlight achievements

---

## 📱 Mobile Optimization

All pages are fully responsive:
- **Mobile:** Single column, stacked cards, hamburger menu
- **Tablet:** 2-column grid, collapsible sidebar
- **Desktop:** Multi-column grid, fixed sidebar

---

## 🐛 Troubleshooting

### "Database connection failed"
→ Check `src/lib/db.js` credentials

### "Table doesn't exist"
→ Run `database/new_sections_schema.sql`

### "Unauthorized"
→ Re-login at `/admin/login`

### "Failed to fetch"
→ Check if dev server is running

### "Cannot read property"
→ Check API response format

---

## 📚 File Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── layout.jsx              # Admin layout + sidebar
│   │   ├── page.jsx                # Dashboard
│   │   ├── applications/
│   │   ├── courses/
│   │   ├── gallery/
│   │   ├── testimonials/
│   │   ├── text-testimonials/      # NEW
│   │   ├── program-impact-new/     # NEW
│   │   ├── youtube-stats/          # NEW
│   │   └── login/
│   └── api/
│       └── admin/
│           ├── applications/
│           ├── courses/
│           ├── gallery/
│           ├── testimonials/
│           ├── text-testimonials/  # NEW
│           ├── program-impact/     # UPDATED
│           └── youtube-stats/      # NEW
├── components/
│   └── ui/                         # shadcn components
└── lib/
    ├── db.js                       # Database connection
    └── auth.js                     # Authentication

database/
├── schema.sql                      # Original schema
└── new_sections_schema.sql         # NEW sections schema
```

---

## 🎉 Features Summary

### YouTube Stats ✨
- Single-entry form
- 4 stat fields
- Preview cards
- Color-coded icons

### Text Testimonials ✨
- Full CRUD
- 5-star ratings
- 8 avatar colors
- Live preview

### Program Impact ✨
- 4 fixed metrics
- Edit-only mode
- Color-coded cards
- Live preview

---

## 📞 Need Help?

1. Check documentation files:
   - `NEW_SECTIONS_SETUP.md`
   - `NEW_ADMIN_FEATURES_SUMMARY.md`
   - `QUICK_REFERENCE.md` (this file)

2. Verify setup:
   - Database tables exist
   - Admin logged in
   - Dev server running

3. Check console:
   - Browser DevTools (F12)
   - Terminal output

---

**Happy Managing! 🚀**

