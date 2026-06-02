'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Play, Sparkles, Trophy } from 'lucide-react';

export default function HeroTile() {
  // Spring configurations matching request
  const springTransition = {
    type: 'spring' as const,
    stiffness: 300,
    damping: 20
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springTransition, delay: 0.1 }}
      whileHover={{ scale: 1.01 }}
      className="col-span-1 lg:col-span-3 glass-panel relative overflow-hidden rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group"
    >
      {/* Background visual elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-cyber-purple/10 to-cyber-pink/5 blur-3xl pointer-events-none -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute -left-10 -bottom-10 w-60 h-60 bg-cyber-cyan/5 blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />

      {/* Hero Welcome Text */}
      <div className="space-y-3 z-10 flex-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-cyber-cyan tracking-wider uppercase font-sans">
          <Sparkles size={12} className="animate-pulse" />
          Systems: Operational
        </div>
        <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight font-sans">
          Welcome back, <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-white via-slate-100 to-cyber-cyan bg-clip-text text-transparent">
            Pathfinder Jane
          </span>
        </h1>
        <p className="text-sm text-slate-400 max-w-md font-sans">
          Your cognitive load is nominal. Continue your mastery paths to sustain your place in the top decile.
        </p>
      </div>

      {/* Streak and Action Tiles */}
      <div className="flex flex-wrap items-center gap-4 z-10 w-full md:w-auto">
        {/* Streak Indicator */}
        <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/5 border border-white/5 shadow-inner">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-500/25 blur-md rounded-full animate-pulse" />
            <Flame className="h-8 w-8 text-orange-500 relative animate-bounce" style={{ animationDuration: '3s' }} />
          </div>
          <div>
            <div className="text-2xl font-black text-white glow-text-purple tracking-tight">12</div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Day Streak</div>
          </div>
        </div>

        {/* Dynamic mini milestone */}
        <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/5 border border-white/5 shadow-inner">
          <div className="relative">
            <div className="absolute inset-0 bg-cyber-cyan/20 blur-md rounded-full" />
            <Trophy className="h-8 w-8 text-cyber-cyan relative" />
          </div>
          <div>
            <div className="text-2xl font-black text-white tracking-tight">3,450</div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">EXP Points</div>
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={springTransition}
          className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white text-sm font-bold shadow-lg hover:shadow-cyber-cyan/25 transition-shadow cursor-pointer w-full md:w-auto"
        >
          <Play size={16} fill="white" />
          <span>Resume NextJS</span>
        </motion.button>
      </div>

      {/* Cybernetic accent details */}
      <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan/35 to-transparent" />
    </motion.div>
  );
}
