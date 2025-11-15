import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { createLP } from '../api/lps';

interface ErrorResponse {
  message?: string;
}

export const useCreateLP = (onClose: () => void, onSuccess?: () => void) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  
  const queryClient = useQueryClient();

  // LP 생성 mutation
  const createLPMutation = useMutation({
    mutationFn: createLP,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lps'] });
      alert('LP가 성공적으로 등록되었습니다!');
      resetForm();
      onClose();
      onSuccess?.();
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage = error.response?.data?.message || 'LP 등록에 실패했습니다.';
      alert(errorMessage);
    },
  });

  const resetForm = () => {
    setTitle('');
    setContent('');
    setTagInput('');
    setTags([]);
    setThumbnail(null);
    setPreviewUrl('');
  };

  const handleFileChange = (file: File) => {
    setThumbnail(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const validateForm = (): boolean => {
    if (!title.trim()) {
      alert('LP 이름을 입력해주세요.');
      return false;
    }

    if (!content.trim()) {
      alert('LP 내용을 입력해주세요.');
      return false;
    }

    if (!thumbnail) {
      alert('LP 사진을 업로드해주세요.');
      return false;
    }

    if (tags.length === 0) {
      alert('태그를 최소 1개 이상 추가해주세요.');
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    createLPMutation.mutate({
      title,
      content,
      thumbnail: thumbnail!,
      tags,
    });
  };

  return {
    title,
    content,
    tagInput,
    tags,
    previewUrl,
    isPending: createLPMutation.isPending,
    setTitle,
    setContent,
    setTagInput,
    handleFileChange,
    handleAddTag,
    handleRemoveTag,
    handleSubmit,
    resetForm,
  };
};