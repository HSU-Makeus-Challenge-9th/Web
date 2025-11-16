import { useState, useEffect } from 'react';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchLpComments, createComment, updateComment, deleteComment } from '../../apis/lp';
import { useAuth } from '../../hooks/useAuth';
import CommentListSkeleton from '../common/CommentListSkeleton';
import type { SortOrder, Comment } from '../../types/api';

interface CommentListProps {
  lpId: number;
}

const CommentList = ({ lpId }: CommentListProps) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc'); // 최신순이 기본값
  const [commentContent, setCommentContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  
  const { userInfo } = useAuth();
  const queryClient = useQueryClient();

  // 댓글 생성 mutation
  const createCommentMutation = useMutation({
    mutationFn: (content: string) => createComment(lpId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lpComments', lpId] });
      setCommentContent('');
    },
    onError: (error: any) => {
      console.error('댓글 생성 실패:', error);
      alert(error.response?.data?.message || '댓글 작성에 실패했습니다.');
    },
  });

  // 댓글 수정 mutation
  const updateCommentMutation = useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) => 
      updateComment(lpId, commentId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lpComments', lpId] });
      setEditingCommentId(null);
      setEditingContent('');
    },
    onError: (error: any) => {
      console.error('댓글 수정 실패:', error);
      alert(error.response?.data?.message || '댓글 수정에 실패했습니다.');
    },
  });

  // 댓글 삭제 mutation
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: number) => deleteComment(lpId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lpComments', lpId] });
    },
    onError: (error: any) => {
      console.error('댓글 삭제 실패:', error);
      alert(error.response?.data?.message || '댓글 삭제에 실패했습니다.');
    },
  });

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
  
  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenuId(null);
    };
    
    if (openMenuId !== null) {
      document.addEventListener('click', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openMenuId]);
  
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

  const handleSubmitComment = () => {
    if (!commentContent.trim()) return;
    createCommentMutation.mutate(commentContent);
  };

  const handleEditComment = (commentId: number) => {
    setEditingCommentId(commentId);
    const comment = allComments.find(c => c.id === commentId);
    if (comment) {
      setEditingContent(comment.content);
    }
    setOpenMenuId(null);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingContent('');
  };

  const handleSaveEdit = (commentId: number) => {
    if (!editingContent.trim()) return;
    updateCommentMutation.mutate({ commentId, content: editingContent });
  };

  const handleDeleteComment = (commentId: number) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      deleteCommentMutation.mutate(commentId);
      setOpenMenuId(null);
    }
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
      {/* 댓글 입력 폼 */}
      <div className="bg-gray-800 rounded-lg p-4">
        <textarea
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="댓글을 입력해주세요"
          className="w-full bg-gray-700 text-white rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-pink-500"
          rows={3}
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={handleSubmitComment}
            disabled={!commentContent.trim() || createCommentMutation.isPending}
            className="bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-6 py-2 rounded transition-colors"
          >
            {createCommentMutation.isPending ? '작성 중...' : '작성'}
          </button>
        </div>
      </div>

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
              {editingCommentId === comment.id ? (
                /* 수정 모드 */
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      {comment.author.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-white text-sm">{comment.author.name}</span>
                      </div>
                      <textarea
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        className="w-full bg-gray-700 text-white rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-pink-500"
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-1.5 rounded text-sm transition-colors"
                    >
                      취소
                    </button>
                    <button
                      onClick={() => handleSaveEdit(comment.id)}
                      disabled={!editingContent.trim() || updateCommentMutation.isPending}
                      className="bg-pink-500 hover:bg-pink-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-4 py-1.5 rounded text-sm transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                /* 일반 모드 */
                <div className="flex gap-3">
                  {/* 프로필 이미지 */}
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    {comment.author.name.charAt(0).toUpperCase()}
                  </div>
                  
                  {/* 댓글 내용 */}
                  <div className="flex-1 space-y-1">
                    {/* 사용자명과 날짜 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white text-sm">{comment.author.name}</span>
                        <span className="text-gray-400 text-xs">{formatDate(comment.createdAt)}</span>
                      </div>
                      
                      {/* 본인 댓글에만 메뉴 버튼 표시 */}
                      {userInfo && userInfo.id === comment.authorId && (
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(openMenuId === comment.id ? null : comment.id);
                            }}
                            className="text-gray-400 hover:text-white p-1 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </button>
                          
                          {/* 메뉴 드롭다운 */}
                          {openMenuId === comment.id && (
                            <div className="absolute right-0 mt-1 bg-gray-700 rounded-lg shadow-lg py-1 z-10 min-w-[100px]">
                              <button
                                onClick={() => handleEditComment(comment.id)}
                                className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600 flex items-center gap-2"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                수정
                              </button>
                              <button
                                onClick={() => handleDeleteComment(comment.id)}
                                disabled={deleteCommentMutation.isPending}
                                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-600 flex items-center gap-2 disabled:opacity-50"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                삭제
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* 댓글 텍스트 */}
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                      {comment.content}
                    </p>
                  </div>
                </div>
              )}
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