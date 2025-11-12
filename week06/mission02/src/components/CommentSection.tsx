import { useState, useCallback, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useInfiniteComments } from '../hooks/useInfiniteComments';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { createComment, deleteComment, updateComment } from '../api/comments';
import { useAuth } from '../hooks/useAuth';
import { getMyInfo } from '../api/auth';
import type { CommentSortOrder } from '../types/comment';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import CommentSkeleton from './CommentSkeleton';

interface CommentSectionProps {
  lpId: string;
}

const CommentSection = ({ lpId }: CommentSectionProps) => {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [sortOrder, setSortOrder] = useState<CommentSortOrder>('desc');
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      getMyInfo().then((response) => {
        setCurrentUserId(response.data.id);
      });
    }
  }, [isAuthenticated]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteComments({ lpId, order: sortOrder });

  // 댓글 작성 mutation
  const createMutation = useMutation({
    mutationFn: (content: string) => createComment(lpId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lpComments', lpId] });
    },
  });

  // 댓글 수정 mutation
  const updateMutation = useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
      updateComment(lpId, commentId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lpComments', lpId] });
    },
  });

  // 댓글 삭제 mutation
  const deleteMutation = useMutation({
    mutationFn: (commentId: number) => deleteComment(lpId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lpComments', lpId] });
    },
  });

  const handleIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const observerRef = useIntersectionObserver({
    onIntersect: handleIntersect,
    enabled: hasNextPage,
  });

  const comments = data?.pages.flatMap((page) => page.data.data) || [];

  return (
    <div className="mt-8 border-t border-gray-800 pt-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-xl font-bold">댓글</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setSortOrder('desc')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              sortOrder === 'desc'
                ? 'bg-white text-black'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            최신순
          </button>
          <button
            onClick={() => setSortOrder('asc')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              sortOrder === 'asc'
                ? 'bg-white text-black'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            오래된순
          </button>
        </div>
      </div>

      {/* 댓글 작성 폼 */}
      {isAuthenticated && (
        <CommentForm
          onSubmit={(content) => createMutation.mutate(content)}
          isSubmitting={createMutation.isPending}
        />
      )}

      {/* 초기 로딩 - 상단 스켈레톤 */}
      {isLoading && (
        <div>
          {Array.from({ length: 3 }).map((_, i) => (
            <CommentSkeleton key={i} />
          ))}
        </div>
      )}

      {isError && (
        <p className="text-red-500 text-center py-4">댓글을 불러오는데 실패했습니다.</p>
      )}

      {!isLoading && !isError && (
        <>
          {comments.length === 0 ? (
            <p className="text-gray-400 text-center py-8">첫 댓글을 작성해보세요!</p>
          ) : (
            <>
              <div>
                {comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onDelete={(id) => deleteMutation.mutate(id)}
                    onEdit={(id, content) => updateMutation.mutate({ commentId: id, content })}
                    isAuthor={currentUserId === comment.authorId}
                  />
                ))}
              </div>

              {/* 무한 스크롤 트리거 & 하단 로딩 스켈레톤 */}
              <div ref={observerRef} className="py-4">
                {isFetchingNextPage && (
                  <div>
                    {Array.from({ length: 3 }).map((_, i) => (
                      <CommentSkeleton key={`loading-${i}`} />
                    ))}
                  </div>
                )}
                {!hasNextPage && comments.length > 0 && (
                  <p className="text-center text-gray-400 text-sm">모든 댓글을 불러왔습니다.</p>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CommentSection;