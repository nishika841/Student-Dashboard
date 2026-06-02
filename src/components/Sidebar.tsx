'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  BookOpen, 
  LineChart, 
  Settings, 
  Compass, 
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils'; // Wait! Let's define a basic cn helper in src/lib/utils.ts next.

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', name: 'My Courses', icon: BookOpen },
    { id: 'explore', name: 'Explore', icon: Compass },
    { id: 'analytics', name: 'Analytics', icon: LineChart },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Sidebar for Desktop & Tablet */}
      <nav 
        className={cn(
          "hidden md:flex flex-col h-screen fixed left-0 top-0 z-40 glass-panel border-r border-white/10 transition-all duration-300 ease-in-out",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 h-20">
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="p-2 rounded-xl bg-gradient-to-tr from-cyber-cyan to-cyber-purple">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-lg tracking-wider bg-gradient-to-r from-cyber-cyan to-cyber-pink bg-clip-text text-transparent glow-text-cyan font-sans">
                NEXUS
              </span>
            </motion.div>
          )}
          {isCollapsed && (
            <div className="p-2 rounded-xl bg-gradient-to-tr from-cyber-cyan to-cyber-purple mx-auto">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
          )}
          
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex items-center justify-center p-1.5 rounded-lg border border-white/10 hover:border-cyber-cyan/50 hover:bg-white/5 transition-all text-slate-400 hover:text-white"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Navigation Items */}
        <ul className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <li key={item.id} className="relative">
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "flex items-center w-full px-4 py-3.5 rounded-xl text-sm font-medium transition-all group relative overflow-hidden",
                    isActive 
                      ? "text-white" 
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  {/* Active highlight background pill using layoutId */}
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active-pill"
                      className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/15 to-cyber-purple/15 border-l-2 border-cyber-cyan rounded-xl"
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    />
                  )}
                  
                  <div className="flex items-center gap-4 z-10">
                    <Icon className={cn(
                      "h-5 w-5 transition-transform group-hover:scale-110",
                      isActive ? "text-cyber-cyan" : "text-slate-400 group-hover:text-white"
                    )} />
                    {!isCollapsed && (
                      <span className="font-sans tracking-wide">{item.name}</span>
                    )}
                  </div>

                  {/* Desktop Hover Border Glow */}
                  <span className="absolute inset-0 border border-transparent group-hover:border-white/5 rounded-xl pointer-events-none" />
                </button>
              </li>
            );
          })}
        </ul>

        {/* Footer Info / User Profile */}
        <div className="p-4 border-t border-white/10">
          <div className={cn(
            "flex items-center gap-3 p-2 rounded-xl bg-white/5",
            isCollapsed ? "justify-center" : ""
          )}>
            <div className="relative">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-cyber-purple to-cyber-pink p-[2px] flex items-center justify-center font-bold text-sm text-white">
                JD
              </div>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border border-slate-900" />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate font-sans">Jane Doe</p>
                <p className="text-[10px] text-slate-400 truncate">ID: Path-206</p>
              </div>
            )}
            {!isCollapsed && (
              <button className="text-slate-400 hover:text-rose-400 transition-colors">
                <LogOut size={16} />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Bottom Navigation for Mobile Devices */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-white/10 h-16 px-4 flex items-center justify-around">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center justify-center flex-1 h-full relative"
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-active-pill"
                  className="absolute inset-x-2 top-1 bottom-1 bg-gradient-to-b from-cyber-cyan/10 to-cyber-purple/10 border-t-2 border-cyber-cyan rounded-lg"
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              )}
              <Icon className={cn(
                "h-5 w-5 z-10",
                isActive ? "text-cyber-cyan" : "text-slate-400"
              )} />
              <span className={cn(
                "text-[10px] mt-1 z-10 font-sans",
                isActive ? "text-white font-medium" : "text-slate-500"
              )}>
                {item.name}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
