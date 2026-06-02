# 🌌 NEXUS // Student Cognitive Dashboard

Nexus is a state-of-the-art, futuristic **Student Dashboard** designed with a premium, glassmorphic dark mode UI. Built with a high-fidelity Bento Grid, it streams real-time course metrics from **Supabase** via **React Server Components (RSC)**, backed by highly responsive layouts and cinematic micro-interactions driven by **Framer Motion**.

---

## 🚀 Key Features

* **Bento Grid Architecture**: A modular, visually stunning layout highlighting welcome streaks, active curriculums, contribution graphs, cognitive stats, and checklists.
* **Futuristic Glassmorphic Theme**: Dark cybernetic canvas textured with an SVG micro-grain noise overlay, radial neon glow, and blurred cards.
* **Cinematic Animations**: Underpinned by strict spring physics (`stiffness: 300`, `damping: 20`) restricted purely to `transform` and `opacity` to avoid layout shifts.
* **Collapsible Glass Sidebar**: Animates active item changes using Framer Motion's `layoutId` pill-slider. Automatically collapses to icon-only on tablet, and transitions to a bottom utility deck on mobile.
* **Dynamic Icon Resolution**: Renders customizable, type-safe Lucide icons matching name fields loaded directly from the database.
* **Dual-Mode Data Stream**: Server-fetches Supabase DB asynchronously. Falls back automatically and gracefully to a detailed secure local cache if connections are absent or credentials missing (showing diagnostic instructions).
* **Responsive Breakpoints**:
  * **Desktop (>1024px)**: Full side navigational controls + 3-column Bento grid.
  * **Tablet (768px - 1024px)**: Compact icon-only sidebar + 2-column grid.
  * **Mobile (<768px)**: Bottom deck floating action bar + single vertical column bento layout.

---

## 🛠️ Mandatory Tech Stack

1. **Framework**: Next.js 16 (App Router, Server-side rendering)
2. **Database & API**: Supabase (PostgreSQL client)
3. **Styling Engine**: Tailwind CSS v4 (@theme directives and custom animations)
4. **Motion Engine**: Framer Motion
5. **Icon Sets**: Lucide React
6. **Helper Utilities**: `clsx`, `tailwind-merge` for class resolution

---

## 📁 Architecture & Directory Structure

```
student-dashboard/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Google Outfit font, global dark layouts, SEO meta tags
│   │   ├── page.tsx           # Asynchronous Server Component (RSC) fetching Supabase
│   │   ├── loading.tsx        # Pre-shimmer dashboard skeleton page to prevent shifts
│   │   ├── error.tsx          # Premium visual system failure fallback panel
│   │   └── globals.css        # Tailwind imports + cyber-radial grids + grainy textures
│   ├── components/
│   │   ├── Sidebar.tsx        # Responsive collapsible navigation with layoutId highlighter
│   │   ├── HeroTile.tsx       # Welcoming panel with active learning streak & exp scores
│   │   ├── CourseCard.tsx     # Curved textured card, spring progress tracker, hover glows
│   │   ├── ActivityTile.tsx   # 12x7 study heat grid matrix + SVG interactive line curves
│   │   ├── QuickStatsTile.tsx # Cognitive dials, global rank widgets, alert banners
│   │   └── SkeletonLoader.tsx # Visual shimmer shapes mirroring components
│   └── lib/
│       ├── supabase.ts        # Supabase client instantiation & robust cached mock seeds
│       └── utils.ts           # Classnames merger (cn helper)
├── supabase.sql               # Database migration script
├── .env.example               # Environmental parameters template
└── README.md                  # System manual and documentation
```

---

## 💾 Supabase Database Setup

To stream active courses, create a table named `courses` in your Supabase SQL Editor and seed the data:

```sql
-- Create the courses table
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    icon_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all public read access to courses
CREATE POLICY "Allow public read access" ON public.courses
    FOR SELECT USING (true);

-- Insert sample courses
INSERT INTO public.courses (title, progress, icon_name)
VALUES
    ('Advanced Next.js & Server Components', 78, 'Cpu'),
    ('Framer Motion Masterclass', 45, 'Sparkles'),
    ('Supabase & Postgres Deep Dive', 92, 'Database'),
    ('Creative UI Design & Glassmorphism', 20, 'Palette')
ON CONFLICT DO NOTHING;
```

---

## ⚙️ Local Configuration & Installation

1. **Clone & Install Dependencies**:
   ```bash
   git clone <your-repository-url>
   cd student-dashboard
   npm install
   ```

2. **Configure Environmental Parameters**:
   Duplicate `.env.example` as `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Add your active Supabase Credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
   ```

3. **Boot Development Environment**:
   ```bash
   npm run dev
   ```
   Navigate to [http://localhost:3000](http://localhost:3000) inside your web portal.

4. **Verify Production Compilation**:
   ```bash
   npm run build
   ```

---

## ⚡ Animations and Performance

Every motion is optimized to protect the frames-per-second (FPS) of modern hardware and prevent CLS (Cumulative Layout Shift):
* **Layout Highlights**: Moving the active tab on the sidebar relies on `layoutId` transition pills that slide smoothly over the DOM nodes.
* **Hardware Accelerated**: Animations are exclusively limited to `opacity` and CSS `transform` (utilizing the GPU) instead of mutating width, height, or margins.
* **Fluid Damping**: Card hovers and progress metrics utilize clean spring configurations (`stiffness: 300`, `damping: 20`) to deliver elastic, lifelike snaps.

---

## 🛸 Vercel Deployment Instructions

1. Push your local workspace into a public/private GitHub repository.
2. Link your GitHub repository in your Vercel Dashboard.
3. In Vercel's **Environment Variables** panel, inject:
   * `NEXT_PUBLIC_SUPABASE_URL`
   * `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Trigger the deployment. Vercel automatically compiles, optimizes, and hosts the application on edge locations globally!
