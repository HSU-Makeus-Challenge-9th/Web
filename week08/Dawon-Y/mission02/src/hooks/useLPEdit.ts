import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateLP } from '../api/lps';
import type { UpdateLPData } from '../api/lps';
import type { LP } from '../types/lp';

export const useLPEdit = (lpId: string, lp: LP | undefined) => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editTags, setEditTags] = useState<string[]>([]);
  const [editThumbnail, setEditThumbnail] = useState<string | File>('');

  // LP 수정 mutation (Optimistic Update 적용)
  const updateMutation = useMutation({
    mutationFn: (data: UpdateLPData) => updateLP(lpId, data),
    onMutate: async (newData) => {
      // 진행 중인 refetch 취소
      await queryClient.cancelQueries({ queryKey: ['lp', lpId] });

      // 이전 값 저장
      const previousLP = queryClient.getQueryData(['lp', lpId]);

      // Optimistic Update: 즉시 UI 업데이트
      queryClient.setQueryData(['lp', lpId], (old: { data?: LP } | undefined) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: {
            ...old.data,
            ...newData,
          },
        };
      });

      return { previousLP };
    },
    onSuccess: () => {
      setIsEditing(false);
      alert('LP가 수정되었습니다!');
    },
    onError: (error: Error, _newData, context) => {
      // 에러 발생 시 이전 값으로 롤백
      if (context?.previousLP) {
        queryClient.setQueryData(['lp', lpId], context.previousLP);
      }
      alert(error?.message || 'LP 수정에 실패했습니다.');
    },
    onSettled: () => {
      // 성공/실패 관계없이 최신 데이터로 refetch
      queryClient.invalidateQueries({ queryKey: ['lp', lpId] });
    },
  });

  // LP 데이터로 수정 폼 초기화
  useEffect(() => {
    if (lp) {
      setEditTitle(lp.title);
      setEditContent(lp.content);
      setEditThumbnail(lp.thumbnail);
      const tagStrings = lp.tags?.map((tag) => (typeof tag === 'string' ? tag : tag.name)) || [];
      setEditTags(tagStrings);
    }
  }, [lp]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    if (lp) {
      setEditTitle(lp.title);
      setEditContent(lp.content);
      setEditThumbnail(lp.thumbnail);
      const tagStrings = lp.tags?.map((tag) => (typeof tag === 'string' ? tag : tag.name)) || [];
      setEditTags(tagStrings);
    }
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    updateMutation.mutate({
      title: editTitle,
      content: editContent,
      tags: editTags,
      thumbnail: editThumbnail,
    });
  };

  return {
    isEditing,
    editTitle,
    editContent,
    editTags,
    editThumbnail,
    setEditTitle,
    setEditContent,
    setEditTags,
    setEditThumbnail,
    handleEditClick,
    handleCancelEdit,
    handleSaveEdit,
    updateMutation,
  };
};