'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, TrendingUp, Zap, Clock } from 'lucide-react';

export default function ActivityTile() {
  const [hoveredCell, setHoveredCell] = useState<{ week: number; day: number; count: number; date: string } | null>(null);
  const [activeChartPoint, setActiveChartPoint] = useState<{ x: string; y: number } | null>(null);

  // Generate 12 weeks of mock contribution activity
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Mar', 'Apr', 'May'];
  
  // Create a structured dataset for the 12x7 matrix
  const matrixData = Array.from({ length: 12 }, (_, weekIndex) => {
    return Array.from({ length: 7 }, (_, dayIndex) => {
      // Create random-like but fixed activity levels
      const seed = (weekIndex * 7 + dayIndex) * 31 % 100;
      let count = 0;
      if (seed > 80) count = 4; // High study (e.g. 4+ hours)
      else if (seed > 55) count = 3; // Med-high
      else if (seed > 30) count = 2; // Med
      else if (seed > 10) count = 1; // Low
      
      // Calculate a mock date
      const date = new Date();
      date.setDate(date.getDate() - (84 - (weekIndex * 7 + dayIndex)));
      const dateString = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      
      return { count, date: dateString };
    });
  });

  // Cell color levels (cyber-cyan/purple gradient intensities)
  const cellColor = (count: number) => {
    switch (count) {
      case 0: return 'bg-white/5 hover:bg-white/10';
      case 1: return 'bg-cyber-cyan/10 hover:bg-cyber-cyan/35 border border-cyber-cyan/10';
      case 2: return 'bg-cyber-cyan/30 hover:bg-cyber-cyan/50 border border-cyber-cyan/20';
      case 3: return 'bg-cyber-purple/50 hover:bg-cyber-purple/70 border border-cyber-purple/30';
      case 4: return 'bg-cyber-pink hover:bg-cyber-pink/90 shadow-[0_0_10px_rgba(217,70,239,0.3)] border border-cyber-pink/40';
      default: return 'bg-white/5';
    }
  };

  // SVG Line Chart Data for Weekly study hours
  const chartData = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 4.0 },
    { day: 'Wed', hours: 1.5 },
    { day: 'Thu', hours: 6.2 },
    { day: 'Fri', hours: 3.8 },
    { day: 'Sat', hours: 5.0 },
    { day: 'Sun', hours: 4.5 },
  ];

  // SVG dimensions
  const width = 500;
  const height = 120;
  const padding = 20;

  // Compute SVG path coordinates
  const points = chartData.map((d, i) => {
    const x = padding + (i * (width - padding * 2)) / (chartData.length - 1);
    const y = height - padding - (d.hours * (height - padding * 2)) / 7;
    return { x, y, day: d.day, hours: d.hours };
  });

  // Create smooth bezier curves
  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const cpX1 = points[i].x + (points[i + 1].x - points[i].x) / 2;
    const cpY1 = points[i].y;
    const cpX2 = points[i].x + (points[i + 1].x - points[i].x) / 2;
    const cpY2 = points[i + 1].y;
    pathD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${points[i + 1].x} ${points[i + 1].y}`;
  }

  // Create path for shadow gradient underneath the line
  const shadowD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <div className="col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-5 gap-6">
      {/* Activity Heat-Grid Matrix (Bento Left: 3 cols) */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
        whileHover={{ scale: 1.01 }}
        className="md:col-span-3 glass-panel p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between group h-72"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/5 to-transparent pointer-events-none" />

        <div className="flex items-center justify-between mb-4 z-10">
          <div className="flex items-center gap-2.5">
            <Calendar size={18} className="text-cyber-cyan" />
            <h2 className="font-bold text-[15px] tracking-wide text-white font-sans">Mastery Consistency</h2>
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans">
            Matrix Grid
          </span>
        </div>

        {/* Matrix Container */}
        <div className="relative flex-1 flex items-center justify-center py-2 z-10">
          <div className="flex gap-[6px]">
            {/* Days indicator column */}
            <div className="flex flex-col justify-between text-[9px] text-slate-500 font-semibold py-[2px] pr-1 h-28 font-mono select-none">
              <span>M</span>
              <span>W</span>
              <span>F</span>
            </div>

            {/* Grid of Cells */}
            <div className="flex gap-[5px]">
              {matrixData.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[5px]">
                  {week.map((cell, dayIndex) => (
                    <motion.div
                      key={dayIndex}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: (weekIndex * 7 + dayIndex) * 0.005 }}
                      className={`h-3 w-3 rounded-[3px] transition-all cursor-pointer ${cellColor(cell.count)}`}
                      onMouseEnter={() => setHoveredCell({ week: weekIndex, day: dayIndex, count: cell.count, date: cell.date })}
                      onMouseLeave={() => setHoveredCell(null)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Tooltip Popover */}
          <AnimatePresence>
            {hoveredCell && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="absolute bottom-full mb-2 bg-slate-950/95 border border-white/10 px-3 py-2 rounded-xl text-xs z-30 shadow-2xl backdrop-blur-md max-w-xs font-sans text-center"
              >
                <div className="font-bold text-white mb-0.5">
                  {hoveredCell.count === 0 ? 'No activity' : `${hoveredCell.count * 1.5} hrs studied`}
                </div>
                <div className="text-[10px] text-slate-400">{hoveredCell.date}</div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-950" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium z-10 pt-2 border-t border-white/5 font-sans">
          <span>84 Days study cycle</span>
          <div className="flex items-center gap-1.5 select-none">
            <span>Less</span>
            <span className="h-2.5 w-2.5 rounded-[2px] bg-white/5" />
            <span className="h-2.5 w-2.5 rounded-[2px] bg-cyber-cyan/20" />
            <span className="h-2.5 w-2.5 rounded-[2px] bg-cyber-cyan/50" />
            <span className="h-2.5 w-2.5 rounded-[2px] bg-cyber-purple/60" />
            <span className="h-2.5 w-2.5 rounded-[2px] bg-cyber-pink shadow-[0_0_5px_rgba(217,70,239,0.5)]" />
            <span>More</span>
          </div>
        </div>
      </motion.div>

      {/* SVG Interactive Line Chart (Bento Right: 2 cols) */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.3 }}
        whileHover={{ scale: 1.01 }}
        className="md:col-span-2 glass-panel p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between group h-72"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/5 to-transparent pointer-events-none" />

        <div className="flex items-center justify-between mb-4 z-10">
          <div className="flex items-center gap-2.5">
            <TrendingUp size={18} className="text-cyber-purple" />
            <h2 className="font-bold text-[15px] tracking-wide text-white font-sans">Learning Velocity</h2>
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans">
            7D Analytics
          </span>
        </div>

        {/* SVG Curve Container */}
        <div className="relative flex-1 flex flex-col justify-end py-1 z-10">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full overflow-visible select-none">
            <defs>
              {/* Gradient beneath the line */}
              <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Grid line guidelines */}
            <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="rgba(255,255,255,0.03)" strokeWidth={1} strokeDasharray="3,3" />
            <line x1={padding} y1={height/2} x2={width - padding} y2={height/2} stroke="rgba(255,255,255,0.03)" strokeWidth={1} strokeDasharray="3,3" />
            <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />

            {/* Glowing path underlay */}
            <path d={shadowD} fill="url(#chartGlow)" />

            {/* Smooth glowing line */}
            <motion.path
              d={pathD}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth={2.5}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
            
            {/* Custom line gradient */}
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="60%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#d946ef" />
            </linearGradient>

            {/* Hover Points Tracker */}
            {points.map((pt, i) => (
              <g key={i}>
                {/* Visual Anchor Dot */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={3.5}
                  className="fill-slate-950 stroke-cyber-purple stroke-2 transition-all group-hover:r-4 cursor-pointer"
                  onMouseEnter={() => setActiveChartPoint({ x: pt.day, y: pt.hours })}
                  onMouseLeave={() => setActiveChartPoint(null)}
                />
                
                {/* Invisible hover trigger zone */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={20}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setActiveChartPoint({ x: pt.day, y: pt.hours })}
                  onMouseLeave={() => setActiveChartPoint(null)}
                />
              </g>
            ))}
          </svg>

          {/* Graph labels */}
          <div className="flex justify-between px-2.5 mt-2 text-[9px] text-slate-500 font-bold font-mono">
            {chartData.map((d, i) => (
              <span key={i}>{d.day}</span>
            ))}
          </div>
        </div>

        {/* Dynamic Interactive Stats Banner */}
        <div className="flex items-center justify-between text-[11px] z-10 pt-2 border-t border-white/5 font-sans">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Clock size={12} className="text-cyber-purple" />
            <span>Avg: <strong className="text-white font-mono">3.8h</strong> / day</span>
          </div>

          <AnimatePresence mode="wait">
            {activeChartPoint ? (
              <motion.div
                key="active"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-cyber-pink font-bold font-mono text-[11px] shadow-sm shadow-cyber-pink/5"
              >
                {activeChartPoint.x}: {activeChartPoint.y} hrs
              </motion.div>
            ) : (
              <motion.div
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-1 text-emerald-400 font-semibold"
              >
                <Zap size={10} className="animate-pulse" />
                <span>+12.5% this week</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
