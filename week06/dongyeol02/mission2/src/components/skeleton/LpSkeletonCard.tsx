// src/components/LpSkeletonCard.tsx

import React from "react";

const LpSkeletonCard: React.FC = () => (
  <li className="relative overflow-hidden group animate-pulse">
    <div className="w-full aspect-square bg-gray-300 dark:bg-gray-700 rounded"></div>

    <div className="mt-2 space-y-2">
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
    </div>
  </li>
);

export default LpSkeletonCard;
