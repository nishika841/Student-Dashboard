'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import HeroTile from '@/components/HeroTile';
import CourseCard from '@/components/CourseCard';
import ActivityTile from '@/components/ActivityTile';
import { CognitiveIndexTile, LeaderboardTile, GoalsTile, AlertBanner } from '@/components/QuickStatsTile';
import { Course } from '@/lib/supabase';
import { Layout, Award, BookOpen, Compass, BarChart } from 'lucide-react';

interface DashboardContainerProps {
  initialCourses: Course[];
  usingMockData: boolean;
  dbError: string | null;
}

export default function DashboardContainer({ 
  initialCourses, 
  usingMockData, 
  dbError 
}: DashboardContainerProps) {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* LEFT: Collapsible Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* RIGHT: Main Dashboard Content */}
      <main className="flex-1 md:pl-64 xl:pl-64 transition-all duration-300 min-h-screen pb-20 md:pb-12">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-6 lg:px-8 bg-dark-bg/25 backdrop-blur-sm sticky top-0 z-30 select-none">
          <div className="flex items-center gap-2">
            <Layout size={18} className="text-cyber-cyan" />
            <h2 className="font-bold text-sm tracking-widest text-slate-400 uppercase font-sans">
              Portal Core // {activeTab}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
              Live Connection
            </span>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* Supabase Status Alert Banner if running on Fallback Mock Data */}
          {usingMockData && (
            <AlertBanner 
              type={dbError ? "warning" : "info"}
              message={
                dbError 
                  ? `Supabase Fetch Failed: "${dbError}". Recovered gracefully using local secure cached streams.`
                  : "Running in Offline Preview Mode. To stream live database events, configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your local environment."
              } 
            />
          )}

          {/* Active Navigation Sections */}
          {activeTab === 'dashboard' ? (
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Bento Row 1: Hero Banner (3 columns wide) */}
              <HeroTile />

              {/* Bento Row 2: Header + Course Tiles */}
              <div className="col-span-1 lg:col-span-3 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} className="text-cyber-cyan" />
                    <h2 className="font-extrabold text-lg tracking-tight text-white font-sans">Active Curriculums</h2>
                  </div>
                  <span className="text-xs text-slate-400 font-medium font-sans">
                    {initialCourses.length} paths registered
                  </span>
                </div>

                {/* Staggered Course Cards Layout (3 columns on desktop, 2 on tablet, 1 on mobile) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {initialCourses.map((course, index) => (
                    <CourseCard key={course.id} course={course} index={index} />
                  ))}
                </div>
              </div>

              {/* Bento Row 3: Activity & Study Heat Grid Matrices */}
              <div className="col-span-1 lg:col-span-3">
                <ActivityTile />
              </div>

              {/* Bento Row 4: auxiliary statistics (Balanced 3 equal cards) */}
              <div className="col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                <CognitiveIndexTile />
                <LeaderboardTile />
                <GoalsTile />
              </div>
            </section>
          ) : (
            <section className="glass-panel p-8 rounded-3xl min-h-[400px] flex flex-col items-center justify-center text-center space-y-4">
              <div className="p-4 rounded-full bg-white/5 border border-white/10 text-slate-500">
                {activeTab === 'courses' && <BookOpen size={32} />}
                {activeTab === 'explore' && <Compass size={32} />}
                {activeTab === 'analytics' && <BarChart size={32} />}
                {activeTab === 'settings' && <Award size={32} />}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-sans capitalize">{activeTab} Interface</h3>
                <p className="text-xs text-slate-400 font-sans max-w-sm mt-1 leading-relaxed">
                  The {activeTab} control deck is currently offline. Return to the main Dashboard to explore operational widgets.
                </p>
              </div>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs font-sans transition-all cursor-pointer"
              >
                Back to Core Dashboard
              </button>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
