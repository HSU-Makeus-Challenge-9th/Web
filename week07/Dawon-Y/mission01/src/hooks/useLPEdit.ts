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

  // LP 수정 mutation
  const updateMutation = useMutation({
    mutationFn: (data: UpdateLPData) => updateLP(lpId, data),
    onSuccess: () => {
      setIsEditing(false);
      alert('LP가 수정되었습니다!');
      queryClient.invalidateQueries({ queryKey: ['lp', lpId] });
    },
    onError: (error: Error) => {
      alert(error?.message || 'LP 수정에 실패했습니다.');
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