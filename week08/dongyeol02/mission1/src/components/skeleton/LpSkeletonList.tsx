// src/components/LpSkeletonList.tsx (수정)

import React from "react";
import LpSkeletonCard from "./LpSkeletonCard";

interface LpSkeletonListProps {
  count?: number; // 렌더링할 스켈레톤 카드 개수 (옵션)
}

const LpSkeletonList: React.FC<LpSkeletonListProps> = ({ count = 10 }) => {
  // 💡 count prop 받기
  const skeletonCount = count;

  return (
    // 💡 1. p-5 div 제거 (패딩은 LpList에서 처리)
    <>
      {/* 💡 2. 제목 뼈대 스타일도 bg-gray-700으로 통일 */}
      <div className="h-8 w-48 bg-gray-700 rounded mb-6 animate-pulse"></div>

      <ul className="grid grid-cols-5 gap-4">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <LpSkeletonCard key={index} />
        ))}
      </ul>
    </>
  );
};

export default LpSkeletonList;
