import React from "react";
import LpSkeletonCard from "./LpSkeletonCard";

const LpSkeletonList: React.FC = () => {
  const skeletonCount = 10;

  return (
    <div className="p-5">
      <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-6 animate-pulse"></div>

      <ul className="grid grid-cols-5 gap-4">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <LpSkeletonCard key={index} />
        ))}
      </ul>
    </div>
  );
};

export default LpSkeletonList;
