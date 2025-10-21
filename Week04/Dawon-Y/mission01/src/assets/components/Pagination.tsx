interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPrevious, 
  onNext 
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center mb-8 mt-4 space-x-4">
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg text-white transition-all duration-200 ${
          currentPage === 1
            ? 'bg-gray-500 cursor-not-allowed opacity-50'
            : 'bg-pink-500 hover:bg-pink-600 cursor-pointer'
        }`}
      >
        이전
      </button>

      <span className="text-lg font-medium text-gray-700 mx-5">
        {currentPage} / {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={currentPage >= totalPages}
        className={`px-4 py-2 rounded-lg text-white transition-all duration-200 ${
          currentPage >= totalPages
            ? 'bg-gray-500 cursor-not-allowed opacity-50'
            : 'bg-green-500 hover:bg-green-600 cursor-pointer'
        }`}
      >
        다음
      </button>
    </div>
  );
}