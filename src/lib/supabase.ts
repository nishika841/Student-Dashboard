import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Instantiate Supabase client only if credentials are set
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Mock data representing Supabase courses in case the database is not configured
export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

export const mockCourses: Course[] = [
  {
    id: 'mock-1',
    title: 'Advanced Next.js & Server Components',
    progress: 78,
    icon_name: 'Cpu',
    created_at: new Date().toISOString(),
  },
  {
    id: 'mock-2',
    title: 'Framer Motion Masterclass',
    progress: 45,
    icon_name: 'Sparkles',
    created_at: new Date().toISOString(),
  },
  {
    id: 'mock-3',
    title: 'Supabase & Postgres Deep Dive',
    progress: 92,
    icon_name: 'Database',
    created_at: new Date().toISOString(),
  },
  {
    id: 'mock-4',
    title: 'Creative UI Design & Glassmorphism',
    progress: 20,
    icon_name: 'Palette',
    created_at: new Date().toISOString(),
  },
];
