import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getLPsByTag } from '../api/lps';
import { useInfiniteLPs } from '../hooks/useInfiniteLPs';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import type { SortOrder } from '../types/lp';
import LPCard from '../components/LPCard';
import LPSkeleton from '../components/LPSkeleton';
import ErrorDisplay from '../components/ErrorDisplay';

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tagFromUrl = searchParams.get('tag') || '';
  
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  
  // 무한 스크롤 쿼리
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingInfinite,
    isError: isErrorInfinite,
    error: errorInfinite,
    refetch: refetchInfinite,
  } = useInfiniteLPs({ order: sortOrder, limit: 10 });

  // 태그 필터링 쿼리
  const {
    data: tagData,
    isLoading: isLoadingTag,
    isError: isErrorTag,
    error: errorTag,
    refetch: refetchTag,
  } = useQuery({
    queryKey: ['lps', 'tag', tagFromUrl],
    queryFn: () => getLPsByTag(tagFromUrl),
    enabled: !!tagFromUrl,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  // 무한 스크롤 트리거
  const handleIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const observerRef = useIntersectionObserver({
    onIntersect: handleIntersect,
    enabled: !tagFromUrl && hasNextPage,
    throttleInterval: 3000,
  });

  const handleSortChange = (order: SortOrder) => {
    setSortOrder(order);
  };

  const clearTag = () => {
    setSearchParams({});
  };

  // 데이터 정규화
  const lpList = tagFromUrl
    ? (tagData?.data?.data || [])
    : (infiniteData?.pages.flatMap((page) => page.data.data) || []);

  const isLoading = tagFromUrl ? isLoadingTag : isLoadingInfinite;
  const isError = tagFromUrl ? isErrorTag : isErrorInfinite;
  const error = tagFromUrl ? errorTag : errorInfinite;
  const refetch = tagFromUrl ? refetchTag : refetchInfinite;

  return (
    <div className="p-4 lg:p-8">
      {/* 태그 필터 */}
      {tagFromUrl && (
        <div className="mb-4 flex items-center gap-2">
          <span className="px-4 py-2 bg-pink-500 text-white rounded-full text-sm">
            # {tagFromUrl}
          </span>
          <button
            onClick={clearTag}
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            ✕ 필터 해제
          </button>
        </div>
      )}

      {/* 정렬 버튼 */}
      {!tagFromUrl && (
        <div className="flex justify-end gap-2 mb-4">
          <button
            onClick={() => handleSortChange('desc')}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              sortOrder === 'desc'
                ? 'bg-white text-black border-white'
                : 'bg-black text-white border-white hover:bg-gray-800'
            }`}
          >
            최신순
          </button>
          <button
            onClick={() => handleSortChange('asc')}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              sortOrder === 'asc'
                ? 'bg-white text-black border-white'
                : 'bg-black text-white border-white hover:bg-gray-800'
            }`}
          >
            오래된순
          </button>
        </div>
      )}

      {/* 초기 로딩 - 상단 스켈레톤 */}
      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <LPSkeleton key={index} />
          ))}
        </div>
      )}

      {/* 에러 */}
      {isError && (
        <ErrorDisplay
          message={error instanceof Error ? error.message : '데이터를 불러오는데 실패했습니다.'}
          onRetry={() => refetch()}
        />
      )}

      {/* 데이터 표시 */}
      {!isLoading && !isError && (
        <>
          {lpList.length === 0 ? (
            <div className="flex items-center justify-center p-8 text-gray-400">
              {tagFromUrl ? `"${tagFromUrl}" 태그가 있는 LP가 없습니다.` : 'LP가 없습니다.'}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {lpList.map((lp) => (
                  <LPCard key={lp.id} lp={lp} />
                ))}
              </div>

              {/* 무한 스크롤 트리거 & 하단 로딩 스켈레톤 */}
              {!tagFromUrl && (
                <div ref={observerRef} className="mt-8">
                  {isFetchingNextPage && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <LPSkeleton key={`loading-${index}`} />
                      ))}
                    </div>
                  )}
                  {!hasNextPage && lpList.length > 0 && (
                    <p className="text-center text-gray-400 py-8">
                      모든 LP를 불러왔습니다.
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;