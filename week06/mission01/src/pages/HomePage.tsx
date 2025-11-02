import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getLPs, getLPsByTag } from '../api/lps';
import type { SortOrder, LPListResponse, LPTagResponse } from '../types/lp';
import LPCard from '../components/LPCard';
import LPSkeleton from '../components/LPSkeleton';
import ErrorDisplay from '../components/ErrorDisplay';

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tagFromUrl = searchParams.get('tag') || '';
  
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  
  // 일반 목록 조회
  const normalQuery = useQuery<LPListResponse>({
    queryKey: ['lps', sortOrder],
    queryFn: () => getLPs({ order: sortOrder, limit: 50 }),
    enabled: !tagFromUrl,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  // 태그 필터링 조회
  const tagQuery = useQuery<LPTagResponse>({
    queryKey: ['lps', 'tag', tagFromUrl],
    queryFn: () => getLPsByTag(tagFromUrl),
    enabled: !!tagFromUrl,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  // 현재 활성화된 쿼리 선택
  const activeQuery = tagFromUrl ? tagQuery : normalQuery;
  const { data, isLoading, isError, error, refetch } = activeQuery;

  const handleSortChange = (order: SortOrder) => {
    setSortOrder(order);
  };

  const clearTag = () => {
    setSearchParams({});
  };

  // 응답 데이터 정규화
  const lpList = data?.data?.data || [];

  return (
    <div className="p-4 lg:p-8">
      {/* 태그 필터 표시 */}
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

      {/* 정렬 버튼 - 태그 필터링 시에는 숨김 */}
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

      {/* 로딩 상태 */}
      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <LPSkeleton key={index} />
          ))}
        </div>
      )}

      {/* 에러 상태 */}
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {lpList.map((lp) => (
                <LPCard key={lp.id} lp={lp} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;