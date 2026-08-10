# InternTrack - Internship Application Tracker

A modern web application for students to track their internship applications, manage deadlines, and visualize their progress.

## Features

- 🎯 **Centralized Tracking** - Keep all your internship applications in one place
- ⏰ **Deadline Reminders** - Never miss an application deadline
- 📊 **Progress Analytics** - Visualize your application journey with charts
- ✅ **Document Checklist** - Track which documents are ready for each application
- 🔐 **Secure Authentication** - Email/password and Google OAuth support

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Database & Auth**: Supabase
- **Charts**: Recharts
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier works)

### Setup

1. **Clone and install dependencies**

```bash
npm install
```

2. **Set up Supabase**

   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Project Settings → API to get your credentials
   - Copy `.env.example` to `.env.local` and add your Supabase credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

3. **Run the database schema**

   - Open your Supabase project's SQL Editor
   - Copy the contents of `supabase/schema.sql`
   - Run the SQL to create tables, policies, and triggers

4. **(Optional) Enable Google OAuth**

   - Follow [Supabase's Google OAuth guide](https://supabase.com/docs/guides/auth/social-login/auth-google)
   - Add your Google Client ID to `.env.local`:

```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
```

5. **Start the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── (marketing)/       # Public pages (home, about)
│   │   ├── page.tsx       # Landing page
│   │   └── layout.tsx     # Marketing layout
│   ├── auth/              # Authentication pages
│   │   ├── signin/
│   │   ├── signup/
│   │   └── callback/
│   └── dashboard/         # Protected dashboard
├── components/
│   ├── layout/            # Header, Footer
│   └── dashboard/         # Dashboard components
├── lib/
│   ├── supabase/          # Supabase clients
│   ├── types.ts           # TypeScript types
│   └── constants.ts       # Shared constants
└── middleware.ts          # Auth middleware

supabase/
└── schema.sql             # Database schema
```

## Database Schema

- **users** - User profiles (name, email, program)
- **applications** - Internship applications (company, role, status, deadlines)
- **tasks** - Document checklist per application (resume, cover letter, transcript)

### Application Status Flow

`Wishlist → Applied → Interview → Offer / Rejected`

## Deployment

Deploy to Vercel:

```bash
npm run build
vercel deploy
```

Make sure to set your environment variables in the Vercel dashboard.
