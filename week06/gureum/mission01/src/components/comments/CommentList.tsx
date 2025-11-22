import { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchLpComments } from '../../services/lpApi';
import CommentListSkeleton from '../common/CommentListSkeleton';
import type { SortOrder, Comment } from '../../types/api';

interface CommentListProps {
  lpId: number;
}

const CommentList = ({ lpId }: CommentListProps) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc'); // 최신순이 기본값

  // React Query Infinite를 사용한 댓글 목록 조회
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
    queryKey: ['lpComments', lpId, sortOrder],
    queryFn: ({ pageParam }: { pageParam: number | undefined }) => 
      fetchLpComments(lpId, { 
        order: sortOrder, 
        limit: 10,
        cursor: pageParam
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
    initialPageParam: undefined as number | undefined
  });

  // 모든 페이지의 댓글 데이터를 하나의 배열로 합치기
  const allComments = data?.pages.flatMap(page => page.data.data) || [];
  
  // 무한 스크롤 트리거 설정
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >= 
        document.documentElement.offsetHeight - 800 && // 800px 전에 미리 로드
        hasNextPage && 
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSortToggle = () => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
  };

  const handleRetry = () => {
    refetch();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-32 space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-2">댓글을 불러올 수 없습니다</h3>
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
    <div className="space-y-4">
      {/* 댓글 헤더 및 정렬 버튼 */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">
          댓글 {allComments.length > 0 ? `(${allComments.length})` : ''}
        </h3>
        
        <button
          onClick={handleSortToggle}
          disabled={isFetching}
          className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 text-white px-3 py-2 rounded border border-gray-600 transition-colors text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
          <span>
            {sortOrder === 'desc' ? '최신순' : '오래된순'}
          </span>
          {isFetching && (
            <div className="w-3 h-3 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
          )}
        </button>
      </div>

      {/* 초기 로딩 상태 */}
      {isLoading && <CommentListSkeleton count={5} />}

      {/* 댓글 목록 */}
      {allComments.length > 0 ? (
        <div className="space-y-1">
          {allComments.map((comment: Comment) => (
            <div key={comment.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors">
              <div className="flex gap-3">
                {/* 프로필 이미지 */}
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                  {comment.author.name.charAt(0).toUpperCase()}
                </div>
                
                {/* 댓글 내용 */}
                <div className="flex-1 space-y-1">
                  {/* 사용자명과 날짜 */}
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-sm">{comment.author.name}</span>
                    <span className="text-gray-400 text-xs">{formatDate(comment.createdAt)}</span>
                  </div>
                  
                  {/* 댓글 텍스트 */}
                  <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : !isLoading && (
        <div className="text-center py-8">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <h3 className="text-lg font-semibold text-white mb-2">아직 댓글이 없습니다</h3>
          <p className="text-gray-400 text-sm">첫 번째 댓글을 남겨보세요!</p>
        </div>
      )}

      {/* 무한 스크롤 로딩 상태 */}
      {isFetchingNextPage && (
        <div className="mt-4">
          <CommentListSkeleton count={3} />
        </div>
      )}

      {/* 더 이상 로드할 데이터가 없을 때 */}
      {!hasNextPage && allComments.length > 0 && (
        <div className="text-center text-gray-400 text-sm pt-4 border-t border-gray-800">
          모든 댓글을 불러왔습니다
        </div>
      )}
    </div>
  );
};

export default CommentList;