import React from 'react';
import { supabase, mockCourses, isSupabaseConfigured } from '@/lib/supabase';
import DashboardContainer from '@/components/DashboardContainer';

export const dynamic = 'force-dynamic';

export default async function Page() {
  let courses = mockCourses;
  let usingMockData = !isSupabaseConfigured;
  let dbError = null;

  if (isSupabaseConfigured && supabase) {
    try {
      // Async Server Component Fetching
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) {
        throw error;
      }
      
      if (data && data.length > 0) {
        courses = data;
      }
    } catch (err: any) {
      console.error('Failed to fetch courses from Supabase:', err);
      usingMockData = true;
      dbError = err.message || 'Database connection error';
    }
  }

  return (
    <DashboardContainer 
      initialCourses={courses} 
      usingMockData={usingMockData} 
      dbError={dbError} 
    />
  );
}
