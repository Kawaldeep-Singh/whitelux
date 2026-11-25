# White Luxe Real Estate — Dynamic Portal & Single-Admin CMS

> **Tagline:** Advisory. Not Agency.  
> **Location:** R-7/109 M3M Urbana, Sector 67, Gurgaon 122102  
> **Brand Persona:** Ethical, strategic, refined, confident, and calm luxury real estate consultancy.

---

## 🏛️ Project Architecture (Unified Single-Folder Full-Stack Next.js)

White Luxe Real Estate is a full-stack Next.js (App Router) luxury real estate application with a single-admin CMS. Both the frontend (UI, client components, admin panel) and backend (Mongoose models, REST API Route Handlers in `src/app/api/...`, JWT auth, Nodemailer alerts, and CSV exports) run seamlessly from one root folder with a single command:

```bash
npm run dev
```

### Folder Structure
```
Whitelux/
├── src/
│   ├── app/                    # Next.js App Router (Public routes, Admin panel, API Route Handlers)
│   │   ├── api/                # Full REST API (Projects, Blogs, Leads, Auth, Settings, Uploads)
│   │   ├── admin/              # Single-Admin CMS panel (Dashboard, Projects, Blogs, Leads, Settings)
│   │   ├── properties/         # Dynamic property listing & [slug] project detail pages
│   │   ├── blog/               # Dynamic journal & [slug] article pages
│   │   ├── about/              # Brand story & values
│   │   ├── services/           # Advisory, investment & interior services
│   │   ├── contact/            # Consultation request & office coordinates
│   │   ├── privacy/            # Privacy policy
│   │   └── disclaimer/         # Legal disclaimer
│   ├── components/             # Reusable luxury UI components & interactive admin forms
│   ├── lib/                    # DB connection, JWT auth, Nodemailer email, CSV generator, API client
│   ├── models/                 # Mongoose schemas: Admin, Project, Blog, Lead, Settings, Testimonial
│   ├── scripts/                # Database seed script (`seed.ts`)
│   └── types/                  # TypeScript interfaces
├── public/                     # Brand logo (`logo.jpeg`), hero image (`home-page.png`), uploads/
├── .env                        # Active environment configuration
├── .env.local                  # Local overrides
├── package.json                # Single package manifest
├── tailwind.config.ts          # Luxury Gold & Black design system
└── tsconfig.json               # TypeScript configuration
```

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Seed the Database
Populates MongoDB Atlas with authentic live website data (5 projects, authentic contact info, blogs, and admin user):
```bash
npm run seed
```

* **Admin Email:** `admin@whiteluxe.com`
* **Admin Password:** `WhiteLuxe@2026!`

### 3. Run the Development Server
Starts the application on `http://localhost:3000`:
```bash
npm run dev
```

* **Public Website:** `http://localhost:3000`
* **Admin Panel:** `http://localhost:3000/admin`
* **Admin Login:** `http://localhost:3000/admin/login`

---

## 🎨 Luxury Theme Tokens & Design System

The application uses an ultra-luxury palette:
* **Dark Backgrounds:** `#0D0D0D`, `#14110C`, `#080808`
* **Gold Accents:** `#C8A24A`, Light `#E3C06F`, Gradient `#B8892F` to `#E8C872`
* **Cream Typography:** `#F4ECD8`, Muted `#A9A294`
* **Ivory Contrast Sections:** `#F6F0E3` with dark text `#1A1712`
* **Typography:** `Cormorant Garamond` (display headings) & `Inter` (body)
* **Alignment:** 90% container max-width with smooth motion & hover micro-interactions

---

## 📧 Automated Lead Notifications
Lead submissions trigger instant email notifications using Nodemailer with Gmail SMTP. A CSV export is also available directly inside the Admin Panel under Leads.
