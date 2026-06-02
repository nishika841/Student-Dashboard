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

-- Insert 4 sample courses
INSERT INTO public.courses (title, progress, icon_name)
VALUES
    ('Advanced Next.js & Server Components', 78, 'Cpu'),
    ('Framer Motion Masterclass', 45, 'Sparkles'),
    ('Supabase & Postgres Deep Dive', 92, 'Database'),
    ('Creative UI Design & Glassmorphism', 20, 'Palette')
ON CONFLICT DO NOTHING;
