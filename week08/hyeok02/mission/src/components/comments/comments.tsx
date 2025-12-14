import React, { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useInfiniteComments, Comment } from '../../hooks/comment/useinfinitecomments';
import { useCreateComment } from '../../hooks/comment/usecreatecomment';
import { useEditComment } from '../../hooks/comment/useeditcomment';
import { useDeleteComment } from '../../hooks/comment/usedeletecomment';
import { Pencil, Trash2 } from "lucide-react";

type Props = {
  lpid: number;
  currentUserId: number;
};

const CommentsSection: React.FC<Props> = ({ lpid, currentUserId }) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [newComment, setNewComment] = useState('');
  const queryClient = useQueryClient();
  const { mutate } = useCreateComment();
  const { mutate: editMutate } = useEditComment();
  const { mutate: deleteMutate } = useDeleteComment();

  const {
    data: pagesData,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteComments(lpid, order);

  const [showContent, setShowContent] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState('');
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  const changeOrder = (newOrder: 'asc' | 'desc') => {
    if (newOrder === order) return;
    setOrder(newOrder);
    queryClient.removeQueries({ queryKey: ['lpComments', lpid, newOrder] });
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    mutate({ lpId: lpid, content: newComment, order }, { onSuccess: () => setNewComment('') });
  };

  const handleEditComment = (commentId: number) => {
    if (!editedContent.trim()) return;
    editMutate({ lpId: lpid, commentId, content: editedContent, order }, { onSuccess: () => setEditingCommentId(null) });
  };

  const handleDeleteComment = (commentId: number) => {
    deleteMutate({ lpId: lpid, commentId, order }, { onSuccess: () => setMenuOpenId(null) });
  };

  const comments: Comment[] = pagesData?.pages.flatMap(page => page.data) || [];

  return (
    <div className="mt-8">
      <div className="flex mb-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력해주세요."
          className="flex-1 bg-gray-800 text-white rounded-l-md px-4 py-2 focus:outline-none"
        />
        <button
          onClick={handleAddComment}
          className="bg-gray-700 text-white px-4 py-2 rounded-r-md"
        >
          작성
        </button>
      </div>

      <div className="flex justify-end gap-2 mb-2">
        <button
          onClick={() => changeOrder('asc')}
          className={`px-3 py-1 rounded ${order === 'asc' ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black'}`}
        >
          오래된순
        </button>
        <button
          onClick={() => changeOrder('desc')}
          className={`px-3 py-1 rounded ${order === 'desc' ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black'}`}
        >
          최신순
        </button>
      </div>

      {(!showContent || isLoading) && (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="w-24 h-3 bg-gray-700 rounded animate-pulse"></div>
                <div className="w-full h-3 bg-gray-700 rounded animate-pulse"></div>
                <div className="w-5/6 h-3 bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showContent && !isLoading && comments.map(comment => (
        <div key={comment.id} className="bg-gray-800 p-3 rounded mb-2 text-white flex items-start gap-2 relative">
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-sm">
            {comment.author.avatar ? (
              <img src={comment.author.avatar} alt={comment.author.name} className="w-8 h-8 rounded-full" />
            ) : (
              comment.author.name.charAt(0)
            )}
          </div>
          <div className="flex-1">
            <p className="font-semibold">{comment.author.name}</p>
            {editingCommentId === comment.id ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="flex-1 bg-gray-700 text-white rounded px-2 py-1"
                />
                <button
                  onClick={() => handleEditComment(comment.id)}
                  className="bg-pink-500 text-white px-2 py-1 rounded"
                >
                  완료
                </button>
              </div>
            ) : (
              <p>{comment.content}</p>
            )}
          </div>

          {comment.author.id === currentUserId && (
            <div className="relative">
              <button onClick={() => setMenuOpenId(menuOpenId === comment.id ? null : comment.id)}>
                ...
              </button>
              {menuOpenId === comment.id && (
                <div className="absolute right-[-10px] mt-1 bg-gray-800 text-white rounded shadow-md flex">
                  <button
                    className="p-2 hover:bg-gray-700 rounded-l flex items-center justify-center"
                    onClick={() => {
                      setEditedContent(comment.content);
                      setEditingCommentId(comment.id);
                      setMenuOpenId(null);
                    }}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="p-2 hover:bg-gray-700 rounded-r flex items-center justify-center"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {isFetchingNextPage && <p>불러오는 중...</p>}
      <div ref={observerRef} />
    </div>
  );
};

export default CommentsSection;
