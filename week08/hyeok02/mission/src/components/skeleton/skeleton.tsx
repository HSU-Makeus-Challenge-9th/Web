import React from 'react';

interface SkeletonGridProps {
  count?: number;
}

const SkeletonGrid: React.FC<SkeletonGridProps> = ({ count = 10 }) => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="w-full aspect-square bg-gray-400 animate-pulse rounded"
        />
      ))}
    </div>
  );
};

export default SkeletonGrid;
