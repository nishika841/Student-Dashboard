'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Course } from '@/lib/supabase';

interface CourseCardProps {
  course: Course;
  index: number;
}

export default function CourseCard({ course, index }: CourseCardProps) {
  // Resolve icon dynamically from lucide-react
  const IconComponent = (Icons as any)[course.icon_name] || Icons.BookOpen;

  // Spring physics configurations requested
  const springTransition = {
    type: 'spring' as const,
    stiffness: 300,
    damping: 20
  };

  // Card entry animations (using only transform and opacity to prevent layout shifts)
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
        delay: index * 0.1
      }
    }
  };

  // Color mapping based on course index for beautiful varied gradients
  const gradients = [
    'from-cyber-cyan/15 via-transparent to-cyber-purple/5',
    'from-cyber-purple/15 via-transparent to-cyber-pink/5',
    'from-cyber-pink/15 via-transparent to-cyber-blue/5',
    'from-cyber-blue/15 via-transparent to-cyber-cyan/5',
  ];

  const borderGlows = [
    'hover:border-cyber-cyan/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]',
    'hover:border-cyber-purple/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]',
    'hover:border-cyber-pink/50 hover:shadow-[0_0_20px_rgba(217,70,239,0.15)]',
    'hover:border-cyber-blue/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]',
  ];

  const accentColors = [
    'text-cyber-cyan bg-cyber-cyan/10',
    'text-cyber-purple bg-cyber-purple/10',
    'text-cyber-pink bg-cyber-pink/10',
    'text-cyber-blue bg-cyber-blue/10',
  ];

  const barColors = [
    'bg-gradient-to-r from-cyber-cyan to-cyber-blue',
    'bg-gradient-to-r from-cyber-purple to-cyber-pink',
    'bg-gradient-to-r from-cyber-pink to-cyber-blue',
    'bg-gradient-to-r from-cyber-blue to-cyber-cyan',
  ];

  const selectedGradient = gradients[index % gradients.length];
  const selectedBorderGlow = borderGlows[index % borderGlows.length];
  const selectedAccent = accentColors[index % accentColors.length];
  const selectedBar = barColors[index % barColors.length];

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02, y: -2 }}
      transition={springTransition}
      className={`glass-panel p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between h-48 cursor-pointer group transition-all duration-300 ${selectedBorderGlow}`}
    >
      {/* Dynamic Gradient Background Accent */}
      <div className={`absolute inset-0 bg-gradient-to-br ${selectedGradient} pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity`} />
      
      {/* Custom Grain/Noise overlay inside card for premium look */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-repeat bg-[size:100px_100px]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='cardNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23cardNoise)'/%3E%3C/svg%3E")`
      }} />

      {/* Card Header */}
      <div className="flex items-start justify-between z-10">
        <div className={`p-3 rounded-xl ${selectedAccent} transition-transform group-hover:scale-110 duration-300`}>
          <IconComponent size={22} className="relative z-10" />
        </div>
        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 font-sans">
          Path-{200 + index * 4}
        </span>
      </div>

      {/* Course Title */}
      <div className="space-y-1.5 z-10">
        <h3 className="font-bold text-[15px] leading-snug tracking-tight text-white group-hover:text-cyber-cyan transition-colors line-clamp-2 font-sans">
          {course.title}
        </h3>
        <p className="text-[11px] text-slate-400 font-sans">
          Core Module
        </p>
      </div>

      {/* Course Progress Section */}
      <div className="space-y-2 z-10 mt-auto">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 font-sans">
          <span>Progress</span>
          <span className="text-white font-mono">{course.progress}%</span>
        </div>
        {/* Progress Track */}
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
          {/* Animated Fill (0% to actual progress using spring animation) */}
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${course.progress}%` }}
            transition={{
              type: 'spring',
              stiffness: 80,
              damping: 15,
              delay: 0.3 + index * 0.1
            }}
            className={`h-full rounded-full relative z-10 ${selectedBar}`}
          />
        </div>
      </div>
    </motion.div>
  );
}
