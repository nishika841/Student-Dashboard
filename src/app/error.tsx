'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, RefreshCw, ArrowLeft } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log details to developer consoles
    console.error('System Failure:', error);
  }, [error]);

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden bg-dark-bg">
      {/* Background glowing rings */}
      <div className="absolute w-96 h-96 bg-rose-500/10 blur-3xl pointer-events-none rounded-full" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="glass-panel p-8 max-w-md w-full rounded-3xl relative overflow-hidden border-rose-500/20 text-center space-y-6"
      >
        <div className="mx-auto p-4 rounded-full bg-rose-500/10 text-rose-500 w-16 h-16 flex items-center justify-center relative">
          <div className="absolute inset-0 bg-rose-500/20 blur-md rounded-full animate-ping" style={{ animationDuration: '2s' }} />
          <ShieldAlert size={32} />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-extrabold text-white tracking-tight font-sans">
            Cognitive Stream Interrupted
          </h2>
          <p className="text-xs text-slate-400 font-sans max-w-sm mx-auto leading-relaxed">
            A critical anomaly was detected in your data synchronization stream. The system aborted the load sequence to protect terminal integrity.
          </p>
        </div>

        {/* Error message detail box */}
        <div className="p-3 bg-black/40 border border-white/5 rounded-xl text-left select-text">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block font-sans">
            Failure Report
          </span>
          <code className="text-[10px] text-rose-300 font-mono break-all leading-normal">
            {error.message || 'ERR_DATABASE_CONNECTION_FAILURE'}
          </code>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => window.location.reload()}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/10 hover:border-white/20 text-slate-300 hover:text-white transition-all text-xs font-bold cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Reload Portal</span>
          </button>
          
          <button
            onClick={() => reset()}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white transition-all text-xs font-bold shadow-lg shadow-rose-950/40 cursor-pointer"
          >
            <RefreshCw size={14} />
            <span>Re-verify Link</span>
          </button>
        </div>
      </motion.div>
    </main>
  );
}
