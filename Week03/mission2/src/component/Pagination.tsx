import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  hasNextPage,
  hasPrevPage,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-4 mt-8">
      {/* 이전 버튼 */}
      <button
        onClick={onPrev}
        disabled={!hasPrevPage} //예외처리로 이전 페이지 없으면 안눌리게!!
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        이전
      </button>

      {/* 현재 페이지*/}
      <span className="text-gray-700 font-medium">{currentPage} 페이지</span>

      {/* 다음 버튼 */}
      <button
        onClick={onNext}
        disabled={!hasNextPage} //예외처리로 다음 페이지 없으면 안눌리게!!
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        다음
      </button>
    </div>
  );
};

export default Pagination;
