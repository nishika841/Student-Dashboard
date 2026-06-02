'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Trophy, CheckCircle, ShieldAlert } from 'lucide-react';

export function CognitiveIndexTile() {
  const springTransition = { type: 'spring' as const, stiffness: 300, damping: 20 };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ...springTransition, delay: 0.4 }}
      whileHover={{ scale: 1.02 }}
      className="glass-panel p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between h-48 cursor-pointer hover:border-cyber-purple/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)] group transition-all"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-cyber-purple/5 to-transparent pointer-events-none" />
      
      <div className="flex items-center justify-between z-10">
        <span className="p-2.5 rounded-xl bg-cyber-purple/10 text-cyber-purple">
          <Brain size={18} className="animate-pulse" />
        </span>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-sans">
          Cognitive Load
        </span>
      </div>

      <div className="flex items-center gap-4 z-10 py-1">
        {/* Radial Dial Indicator */}
        <div className="relative h-16 w-16 flex items-center justify-center">
          <svg className="h-full w-full -rotate-90">
            <circle cx="32" cy="32" r="26" stroke="rgba(255,255,255,0.03)" strokeWidth="4" fill="transparent" />
            <motion.circle
              cx="32"
              cy="32"
              r="26"
              stroke="#8b5cf6"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray="163"
              initial={{ strokeDashoffset: 163 }}
              animate={{ strokeDashoffset: 163 - (163 * 82) / 100 }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
            />
          </svg>
          <span className="absolute font-bold text-xs text-white font-mono">82%</span>
        </div>

        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white font-sans">Systems Nominal</h4>
          <p className="text-[11px] text-slate-400 font-sans leading-tight">Focus score is exceptionally high today.</p>
        </div>
      </div>

      <div className="text-[10px] text-slate-500 font-medium z-10 pt-2 border-t border-white/5 font-sans">
        Optimal learning threshold
      </div>
    </motion.div>
  );
}

export function LeaderboardTile() {
  const springTransition = { type: 'spring' as const, stiffness: 300, damping: 20 };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ...springTransition, delay: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="glass-panel p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between h-48 cursor-pointer hover:border-cyber-pink/40 hover:shadow-[0_0_20px_rgba(217,70,239,0.1)] group transition-all"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-cyber-pink/5 to-transparent pointer-events-none" />
      
      <div className="flex items-center justify-between z-10">
        <span className="p-2.5 rounded-xl bg-cyber-pink/10 text-cyber-pink">
          <Trophy size={18} />
        </span>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-sans">
          Global Rank
        </span>
      </div>

      <div className="z-10 py-1 space-y-1">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-black text-white glow-text-pink tracking-tight font-sans">#144</span>
          <span className="text-[10px] text-cyber-pink font-semibold">Top 3.5%</span>
        </div>
        <p className="text-[11px] text-slate-400 font-sans leading-tight">
          You advanced 8 ranks in the last 48 hours. Keep it up!
        </p>
      </div>

      <div className="text-[10px] text-slate-500 font-medium z-10 pt-2 border-t border-white/5 font-sans">
        Next milestone in 450 EXP
      </div>
    </motion.div>
  );
}

export function GoalsTile() {
  const springTransition = { type: 'spring' as const, stiffness: 300, damping: 20 };

  const activeGoals = [
    { label: 'RSC Data Fetching', checked: true },
    { label: 'Spring Motion Physic', checked: true },
    { label: 'Glassmorphic Sidebar', checked: false }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ...springTransition, delay: 0.6 }}
      whileHover={{ scale: 1.02 }}
      className="glass-panel p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between h-48 cursor-pointer hover:border-cyber-cyan/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] group transition-all"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-cyber-cyan/5 to-transparent pointer-events-none" />
      
      <div className="flex items-center justify-between z-10">
        <span className="p-2.5 rounded-xl bg-cyber-cyan/10 text-cyber-cyan">
          <CheckCircle size={18} />
        </span>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-sans">
          Day Target
        </span>
      </div>

      <ul className="z-10 py-1 space-y-1.5 font-sans text-xs">
        {activeGoals.map((goal, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${goal.checked ? 'bg-cyber-cyan shadow-[0_0_5px_rgba(6,182,212,0.5)]' : 'bg-white/10'}`} />
            <span className={goal.checked ? 'text-slate-200 font-medium' : 'text-slate-500 line-through'}>
              {goal.label}
            </span>
          </li>
        ))}
      </ul>

      <div className="text-[10px] text-slate-500 font-medium z-10 pt-2 border-t border-white/5 font-sans">
        Daily objectives: 2 / 3 complete
      </div>
    </motion.div>
  );
}

interface AlertBannerProps {
  message: string;
  type?: 'warning' | 'info';
}

export function AlertBanner({ message, type = 'info' }: AlertBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-2xl glass-panel border flex items-center gap-3.5 text-xs font-sans ${
        type === 'warning'
          ? 'border-amber-500/20 bg-amber-500/5 text-amber-300'
          : 'border-cyber-cyan/20 bg-cyber-cyan/5 text-cyber-cyan'
      }`}
    >
      <ShieldAlert size={18} className={type === 'warning' ? 'text-amber-400' : 'text-cyber-cyan'} />
      <div className="flex-1 leading-snug">
        {message}
      </div>
    </motion.div>
  );
}
