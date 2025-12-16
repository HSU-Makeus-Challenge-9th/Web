import { useState, useEffect, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { fetchLpList } from '../../apis/lp';
import LpCard from '../common/LpCard';
import LpListSkeleton from '../common/LpListSkeleton';
import useDebounce from '../../hooks/useDebounce';
import useThrottle from '../../hooks/useThrottle';
import type { SortOrder } from '../../types/api';

const LpList = () => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc'); // 최신순이 기본값
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 state
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // 300ms 디바운스 적용 (권장)

  // 빈 문자열 및 공백만 있는 검색어 체크
  const trimmedSearch = debouncedSearchTerm.trim();
  const isSearchActive = trimmedSearch.length > 0;

  // React Query Infinite를 사용한 LP 목록 조회
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['search', trimmedSearch, sortOrder], // 검색어를 queryKey에 포함
    queryFn: ({ pageParam }: { pageParam: number | undefined }) => fetchLpList({ 
      order: sortOrder, 
      limit: 12,
      cursor: pageParam,
      search: isSearchActive ? trimmedSearch : undefined // 검색어가 있을 때만 전달
    }),
    getNextPageParam: (lastPage) => {
      // cursor 기반 페이지네이션: hasNext가 true이고 nextCursor가 있으면 다음 페이지 존재
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
    initialPageParam: undefined as number | undefined,
    // 성능 최적화: 캐시 설정
    staleTime: 1000 * 60 * 5, // 5분간 데이터를 fresh 상태로 유지
    gcTime: 1000 * 60 * 10, // 10분간 캐시 유지 (구 cacheTime)
    // 빈 검색어일 때는 쿼리 비활성화하지 않음 (전체 목록 표시)
    enabled: true
  });

  const handleSortToggle = () => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
  };

  // 검색어 변경 핸들러
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // 검색어 초기화
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  // 모든 페이지의 LP 데이터를 하나의 배열로 합치기
  const allLps = data?.pages.flatMap(page => page.data.data) || [];
  
  // 서버에서 검색된 결과 그대로 사용 (클라이언트 필터링 제거)
  const displayLps = allLps;
  
  // 무한 스크롤 핸들러 (useThrottle 적용)
  const handleInfiniteScroll = useThrottle(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >= 
      document.documentElement.offsetHeight - 1000 && // 1000px 전에 미리 로드
      hasNextPage && 
      !isFetchingNextPage
    ) {
      console.log('🔄 다음 페이지 로딩 중... (Throttled)');
      fetchNextPage();
    }
  }, 1000); // 1초에 한 번만 실행
  
  // 무한 스크롤 트리거 설정
  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll);
    return () => window.removeEventListener('scroll', handleInfiniteScroll);
  }, [handleInfiniteScroll]);

  const handleLpClick = (lpId: number) => {
    navigate(`/lps/${lpId}`);
  };

  const handleRetry = () => {
    refetch();
  };

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 space-y-4">
        <div className="text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-white mb-2">데이터를 불러올 수 없습니다</h3>
          <p className="text-gray-400 text-sm mb-4">
            {error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다'}
          </p>
        </div>
        <button
          onClick={handleRetry}
          disabled={isFetching}
          className="bg-pink-500 hover:bg-pink-600 disabled:bg-pink-700 text-white px-6 py-2 rounded transition-colors"
        >
          {isFetching ? '재시도 중...' : '다시 시도'}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 헤더 및 검색/정렬 */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">LP 목록</h2>
          </div>
          
          <button
            onClick={handleSortToggle}
            disabled={isFetching}
            className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 text-white px-4 py-2 rounded border border-gray-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0M8 5a2 2 0 012-2h4a2 2 0 012 2v0" />
            </svg>
            <span>
              {sortOrder === 'desc' ? '최신순' : '오래된순'}
            </span>
            {isFetching && (
              <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
            )}
          </button>
        </div>

        {/* 검색창 */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="LP 제목이나 내용으로 검색..."
            className="w-full pl-10 pr-10 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
          />
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* 검색 결과 정보 */}
        {isSearchActive && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">
              "{trimmedSearch}" 검색 결과: {displayLps.length}개
            </span>
            {isFetching && !isFetchingNextPage && (
              <span className="text-pink-500 flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                검색 중...
              </span>
            )}
          </div>
        )}
      </div>

      {/* 로딩 상태 */}
      {isLoading && <LpListSkeleton count={6} />}

      {/* LP 목록 */}
      {displayLps.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {displayLps.map((lp) => (
            <LpCard
              key={lp.id}
              lp={lp}
              onClick={() => handleLpClick(lp.id)}
            />
          ))}
        </div>
      ) : !isLoading && (
        <div className="flex flex-col items-center justify-center min-h-64 space-y-4">
          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">
              {isSearchActive ? '검색 결과가 없습니다' : 'LP가 없습니다'}
            </h3>
            <p className="text-gray-400 text-sm">
              {isSearchActive ? '다른 검색어로 시도해보세요' : '첫 번째 LP를 만들어보세요!'}
            </p>
          </div>
        </div>
      )}

      {/* 무한 스크롤 로딩 상태 */}
      {isFetchingNextPage && (
        <div className="mt-8">
          <LpListSkeleton count={4} />
        </div>
      )}

      {/* 더 이상 로드할 데이터가 없을 때 */}
      {!hasNextPage && displayLps.length > 0 && (
        <div className="text-center text-gray-400 text-sm pt-8 border-t border-gray-800">
          {isSearchActive ? '검색 결과를 모두 불러왔습니다' : '모든 LP를 불러왔습니다'}
        </div>
      )}
    </div>
  );
};

export default LpList;