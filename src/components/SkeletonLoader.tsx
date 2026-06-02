import React from 'react';

export function CourseCardSkeleton() {
  return (
    <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between h-48 relative overflow-hidden animate-pulse select-none">
      {/* Shimmer element */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
      
      {/* Top icon and metadata */}
      <div className="flex justify-between items-center">
        <div className="h-10 w-10 rounded-xl bg-white/5" />
        <div className="h-3 w-12 bg-white/5 rounded" />
      </div>

      {/* Middle texts */}
      <div className="space-y-2 mt-4">
        <div className="h-4 w-3/4 bg-white/5 rounded" />
        <div className="h-3 w-1/2 bg-white/5 rounded" />
      </div>

      {/* Progress bar */}
      <div className="space-y-2 mt-auto">
        <div className="flex justify-between">
          <div className="h-3 w-12 bg-white/5 rounded" />
          <div className="h-3 w-8 bg-white/5 rounded" />
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full" />
      </div>
    </div>
  );
}

export function HeroTileSkeleton() {
  return (
    <div className="col-span-1 lg:col-span-3 glass-panel rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 h-48 relative overflow-hidden animate-pulse select-none">
      <div className="space-y-3 flex-1 w-full">
        <div className="h-5 w-32 bg-white/5 rounded-full" />
        <div className="h-8 w-48 bg-white/5 rounded" />
        <div className="h-4 w-2/3 bg-white/5 rounded" />
      </div>
      <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
        <div className="h-16 w-24 bg-white/5 rounded-2xl" />
        <div className="h-16 w-24 bg-white/5 rounded-2xl" />
        <div className="h-16 w-32 bg-white/5 rounded-2xl" />
      </div>
    </div>
  );
}

export function ActivityTileSkeleton() {
  return (
    <div className="col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-5 gap-6">
      <div className="md:col-span-3 glass-panel p-6 rounded-3xl h-72 relative overflow-hidden animate-pulse flex flex-col justify-between select-none">
        <div className="flex justify-between items-center">
          <div className="h-5 w-36 bg-white/5 rounded" />
          <div className="h-4 w-12 bg-white/5 rounded" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="h-28 w-5/6 bg-white/5 rounded-lg" />
        </div>
        <div className="h-5 w-full bg-white/5 rounded pt-2 border-t border-white/5" />
      </div>

      <div className="md:col-span-2 glass-panel p-6 rounded-3xl h-72 relative overflow-hidden animate-pulse flex flex-col justify-between select-none">
        <div className="flex justify-between items-center">
          <div className="h-5 w-36 bg-white/5 rounded" />
          <div className="h-4 w-12 bg-white/5 rounded" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="h-28 w-5/6 bg-white/5 rounded-lg" />
        </div>
        <div className="h-5 w-full bg-white/5 rounded pt-2 border-t border-white/5" />
      </div>
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6 w-full pb-12">
      <HeroTileSkeleton />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CourseCardSkeleton />
        <CourseCardSkeleton />
        <CourseCardSkeleton />
      </div>

      <ActivityTileSkeleton />
    </div>
  );
}
