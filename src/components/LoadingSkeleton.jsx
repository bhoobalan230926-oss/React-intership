import React from 'react';

const LoadingSkeleton = ({ count = 3 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white dark:bg-dark-surface rounded-lg border border-gray-200 dark:border-dark-border p-6"
        >
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-12 h-12 bg-gray-200 dark:bg-dark-border rounded-lg animate-pulse" />
            <div className="flex-1">
              <div className="h-4 bg-gray-200 dark:bg-dark-border rounded w-1/4 mb-2 animate-pulse" />
              <div className="h-3 bg-gray-100 dark:bg-dark-border/50 rounded w-1/3 animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="h-3 bg-gray-100 dark:bg-dark-border/50 rounded animate-pulse" />
            <div className="h-3 bg-gray-100 dark:bg-dark-border/50 rounded animate-pulse" />
            <div className="h-3 bg-gray-100 dark:bg-dark-border/50 rounded animate-pulse" />
            <div className="h-3 bg-gray-100 dark:bg-dark-border/50 rounded animate-pulse" />
          </div>
          <div className="flex gap-2 mb-4">
            <div className="h-6 w-12 bg-gray-100 dark:bg-dark-border/50 rounded-full animate-pulse" />
            <div className="h-6 w-12 bg-gray-100 dark:bg-dark-border/50 rounded-full animate-pulse" />
            <div className="h-6 w-12 bg-gray-100 dark:bg-dark-border/50 rounded-full animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
