# Ankit Singh - Portfolio

A modern, production-ready portfolio website showcasing 27+ finance automation and analytics projects. Built with Next.js 14, TypeScript, Tailwind CSS, and PostgreSQL.

## 🎯 Features

- ✅ **27 Project Case Studies** - Detailed portfolio with filters by domain, search, and featured projects
- ✅ **Authentication System** - Secure admin login with password reset via email
- ✅ **Admin Panel** - Full CRUD operations for projects (Create, Read, Update, Delete)
- ✅ **Contact Form** - Newsletter/contact submissions with email notifications
- ✅ **Responsive Design** - Clean corporate/professional design with royal green theme
- ✅ **SEO Optimized** - Meta tags, structured data, Open Graph
- ✅ **Markdown Support** - Rich content editing for project descriptions
- ✅ **Free Hosting** - Deploy on Vercel (free tier) + Supabase (free tier)

## 🚀 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router), React 18, TypeScript |
| Styling | Tailwind CSS |
| Backend | Next.js API Routes |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma |
| Authentication | NextAuth.js (Credentials) |
| Email | Resend API |
| Deploy | Vercel |

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A Supabase account (free) - [supabase.com](https://supabase.com)
- A Resend account (free tier) - [resend.com](https://resend.com)
- A GitHub account (for deployment)

## 🛠️ Local Setup

### 1. Clone and Install

```bash
cd ankit-singh-portfolio
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

Update `.env.local` with your actual values:

```env
# Supabase PostgreSQL Connection
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

# NextAuth
NEXTAUTH_SECRET="generate-a-random-secret-key-change-this"
NEXTAUTH_URL="http://localhost:3000"

# Resend (for email notifications)
RESEND_API_KEY="re_xxxxxxxxxxxx"
ADMIN_EMAIL="ankit.singh.offcode@gmail.com"

# App
NEXT_PUBLIC_APP_NAME="Ankit Singh - Portfolio"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 3. Database Setup

#### Create Supabase Project
1. Go to [Supabase](https://supabase.com) and create a new project
2. Wait for the database to be ready
3. Copy your `DATABASE_URL` from Settings → Database

#### Run Prisma Migrations

```bash
# Push schema to database
npx prisma db push

# Seed database with projects
npm run db:seed
```

This will:
- Create all tables (users, projects, contacts, resume, password_reset_token)
- Create an admin user (email: your ADMIN_EMAIL from env)
- Insert all 27 projects into the database

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Admin Access

**Login Credentials:**
- Email: `ankit.singh.offcode@gmail.com` (or the ADMIN_EMAIL you set)
- Password: `admin123`

**Important:** Change the admin password after first login via the password reset feature.

---

## ☁️ Deploy to Vercel (Free)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ankitsinghoffcode/ankit-singh-portfolio.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [Vercel](https://vercel.com) and sign in with GitHub
2. Click "Import Project"
3. Select your `ankit-singh-portfolio` repository
4. Configure Environment Variables (same as `.env.local`)
5. Click "Deploy"

Vercel will automatically:
- Install dependencies
- Run `prisma db push` during build
- Build and deploy your app
- Provide a live URL (e.g., `https://ankit-singh-portfolio.vercel.app`)

### 3. Post-Deployment

After deployment:
1. Visit your deployed site
2. Go to `/login` and sign in with admin credentials
3. Update settings as needed

---

## 📧 Email Configuration (Resend)

1. Sign up at [Resend](https://resend.com)
2. Verify your domain (or use the default `@resend.dev` for testing)
3. Get your API key from API Keys section
4. Add to environment variables: `RESEND_API_KEY=re_xxxxx`

**Emails sent:**
- Password reset emails
- Contact form notifications

---

## 🔐 Authentication

The app uses **NextAuth.js** with Credentials provider:

### Credentials
- Email: `ankit.singh.offcode@gmail.com` (configurable)
- Password: Hashed with bcrypt

### Password Reset
1. Click "Forgot Password?" on login page
2. Enter email address
3. Receive reset link via email (expires in 1 hour)
4. Set new password

---

## 📦 Database Schema

### Tables

**users** - Admin authentication
- `id`, `email`, `name`, `password`, `createdAt`, `updatedAt`

**projects** - Portfolio projects
- `id`, `caseId`, `client`, `businessDomain`, `projectName`, `slug`, `technologies`, `metrics`, `featured`, etc.

**contacts** - Contact form submissions
- `id`, `name`, `email`, `subject`, `message`, `createdAt`

**resume** - Resume metadata (you can upload PDF URL)
- `id`, `filename`, `url`, `content`, `updatedAt`

**password_reset_token** - For password reset functionality
- `id`, `email`, `token`, `expiresAt`, `createdAt`

---

## 🌐 API Endpoints

### Public
- `GET    /api/projects` - Fetch all projects (with optional query params: `?search=...&domain=...`)
- `GET    /api/projects/[slug]` - Fetch single project by slug
- `POST   /api/contacts` - Submit contact form

### Protected (Requires Admin Auth)
- `POST   /api/projects` - Create new project
- `PUT    /api/projects/[slug]` - Update project
- `DELETE /api/projects/[slug]` - Delete project

### Authentication
- `POST   /api/auth/callback/credentials` - Login
- `POST   /api/auth/forgot-password` - Request password reset
- `POST   /api/auth/reset-password` - Reset password with token

---

## 🎨 Design System

### Colors
- Primary: `#0B6623` (Royal Green)
- Primary Dark: `#14532d`
- Background: White `#ffffff`, Light Gray `#f9fafb`
- Text: Dark `#111827`, Medium `#4b5563`
- Accent: Amber `#f59e0b` (for highlights)

### Typography
- Font: Inter (via Google Fonts)
- Headings: Bold, responsive sizes
- Body: 16px base, comfortable line-height

---

## 📁 Project Structure

```
ankit-singh-portfolio/
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   │   ├── auth/         # NextAuth handlers
│   │   │   ├── contacts/     # Contact form API
│   │   │   ├── projects/     # Projects CRUD API
│   │   │   └── ...
│   │   ├── admin/            # Admin panel (protected)
│   │   ├── contact/          # Contact page
│   │   ├── forgot-password/  # Forgot password page
│   │   ├── login/            # Login page
│   │   ├── projects/         # Projects listing & detail
│   │   ├── reset-password/   # Reset password page
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Homepage
│   ├── components/           # Reusable React components
│   │   ├── ProjectCard.tsx
│   │   └── ProjectsPageClient.tsx
│   ├── lib/                  # Utilities
│   │   ├── auth.ts           # NextAuth config
│   │   └── prisma.ts         # Prisma client
│   └── types/                # TypeScript definitions
│       └── index.ts
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Database seeder with 27 projects
├── public/                   # Static assets
├── .env.example              # Environment template
├── .env.local                # Your environment variables (gitignored)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🔧 Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm start               # Start production server
npm run lint            # Run ESLint

# Database
npx prisma studio       # Open Prisma Studio (database GUI)
npx prisma db push      # Push schema to database
npm run db:seed         # Seed database with initial data

# Re-seed (if needed)
npx prisma db push --force-reset  # WARNING: deletes all data
npm run db:seed
```

---

## 🚀 Deployment Checklist

Before going live:

- [ ] Change admin password from `admin123`
- [ ] Update `ADMIN_EMAIL` to your actual email
- [ ] Configure Resend domain (not just `@resend.dev`)
- [ ] Set proper site URL in `NEXTAUTH_URL` for production
- [ ] Update `.env` on Vercel with production values
- [ ] Test contact form and password reset email delivery
- [ ] Add custom domain in Vercel (optional)
- [ ] Review privacy policy if needed
- [ ] Add Google Analytics if desired

---

## 🛡️ Security Considerations

- ✅ Passwords hashed with bcrypt
- ✅ Rate limiting on login (via NextAuth)
- ✅ CSRF protection (NextAuth built-in)
- ✅ SQL injection prevention (Prisma ORM)
- ✅ XSS protection (React escaping)
- ✅ CORS configured
- ✅ Environment variables for secrets
- ✅ Admin routes protected by middleware
- ✅ Password reset tokens expire in 1 hour

---

## 📝 Customization

### Update Your Info

Edit in **Admin Panel** after logging in:
- Project details
- Add new projects
- Update client names, domains, metrics
- Mark projects as featured

### Change Colors

Edit `tailwind.config.ts`:

```ts
colors: {
  primary: {
    600: '#0B6623',  // Your primary green
    700: '#14532d',  // Darker hover
  }
}
```

### Add New Projects

Admin Panel → "Add Project" button

Or directly via Prisma Studio:
```bash
npx prisma studio
```

---

## 🐛 Troubleshooting

### "Unable to get issuer certificate locally" on Windows
This is a Windows certificate issue. Set environment variable:
```bash
set NODE_TLS_REJECT_UNAUTHORIZED=0
npm install
```
(Only for development, not for production)

### Database connection fails
- Check your Supabase DATABASE_URL is correct
- Ensure IP allowlist in Supabase includes your IP (or set to "Allow all" for testing)

### Emails not sending
- Verify RESEND_API_KEY is correct
- Check Resend dashboard for email logs
- For testing, use Resend's default `@resend.dev` domain
- Add your email to test viewers in Resend

### Login fails
- Ensure admin user exists in database (`npm run db:seed`)
- Check NEXTAUTH_SECRET is set
- Verify NEXTAUTH_URL matches your dev URL

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase + Next.js Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)

---

## 📄 License

This project is created for Ankit Singh's personal portfolio. All rights reserved.

---

## 💡 Credits

Built with Claude Code - Anthropic's AI coding assistant.

---

## 🔗 Links

- **Portfolio:** [Your deployed URL]
- **LinkedIn:** [https://www.linkedin.com/in/Brand-Ankit](https://www.linkedin.com/in/Brand-Ankit)
- **Email:** ankit.singh.offcode@gmail.com

---

**Built with ❤️ using Next.js, Tailwind CSS, and PostgreSQL**
