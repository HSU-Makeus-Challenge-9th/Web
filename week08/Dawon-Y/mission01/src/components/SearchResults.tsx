import type { LP } from '../types/lp';
import LPCard from './LPCard';
import LPSkeleton from './LPSkeleton';

interface SearchResultsProps {
  debouncedQuery: string;
  searchResults: LP[];
  isLoading: boolean;
  isError: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  sortOrder: 'desc' | 'asc';
  observerRef: React.RefObject<HTMLDivElement | null>;
  onSortChange: (order: 'desc' | 'asc') => void;
  onLPClick: (lpId: number) => void;
}

const SearchResults = ({
  debouncedQuery,
  searchResults,
  isLoading,
  isError,
  isFetchingNextPage,
  hasNextPage,
  sortOrder,
  observerRef,
  onSortChange,
  onLPClick,
}: SearchResultsProps) => {
  // 검색어가 없을 때
  if (!debouncedQuery.trim()) {
    return (
      <div className="text-gray-400 text-center py-20">
        검색어를 입력하세요
      </div>
    );
  }

  // 로딩 중
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <LPSkeleton key={index} />
        ))}
      </div>
    );
  }

  // 에러
  if (isError) {
    return (
      <div className="text-red-500 text-center py-20">
        검색 중 오류가 발생했습니다.
      </div>
    );
  }

  // 검색 결과 없음
  if (searchResults.length === 0) {
    return (
      <div className="text-gray-400 text-center py-20">
        "{debouncedQuery}" 검색 결과가 없습니다.
      </div>
    );
  }

  // 검색 결과 표시
  return (
    <>
      <div className="mb-4 flex items-center justify-end gap-2">
        {/* 정렬 버튼 */}
        <button
          onClick={() => onSortChange('asc')}
          className={`px-3 py-1.5 rounded text-sm transition-colors ${
            sortOrder === 'asc'
              ? 'bg-white text-black'
              : 'bg-gray-700 text-white hover:bg-gray-600'
          }`}
        >
          오래된순
        </button>
        <button
          onClick={() => onSortChange('desc')}
          className={`px-3 py-1.5 rounded text-sm transition-colors ${
            sortOrder === 'desc'
              ? 'bg-white text-black'
              : 'bg-gray-700 text-white hover:bg-gray-600'
          }`}
        >
          최신순
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {searchResults.map((lp) => (
          <div key={lp.id} onClick={() => onLPClick(lp.id)} className="cursor-pointer">
            <LPCard lp={lp} />
          </div>
        ))}
      </div>

      {/* 무한 스크롤 트리거 */}
      <div ref={observerRef} className="mt-8">
        {isFetchingNextPage && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <LPSkeleton key={`loading-${index}`} />
            ))}
          </div>
        )}
        {!hasNextPage && searchResults.length > 0 && (
          <p className="text-center text-gray-400 py-8">
            모든 검색 결과를 불러왔습니다.
          </p>
        )}
      </div>
    </>
  );
};

export default SearchResults;