import React from 'react';
import DashboardSkeleton from '@/components/SkeletonLoader';

export default function Loading() {
  return (
    <main className="flex-1 md:pl-64 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 mt-4 md:mt-0">
        {/* Shimmer layout */}
        <DashboardSkeleton />
      </div>
    </main>
  );
}
