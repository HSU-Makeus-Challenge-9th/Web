import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { deleteLP, toggleLPLike } from '../api/lps';
import { useAuth } from './useAuth';

export const useLPActions = (lpId: string) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();

  const deleteMutation = useMutation({
    mutationFn: () => deleteLP(lpId),
    onSuccess: () => {
      alert('LP가 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['lps'] });
      navigate('/');
    },
    onError: () => {
      alert('LP 삭제에 실패했습니다.');
    },
  });

  // 좋아요 mutation - Optimistic Update 적용
  const likeMutation = useMutation({
    mutationFn: (isLiked: boolean) => toggleLPLike(lpId, isLiked),
    onMutate: async () => {
      // 진행 중인 refetch 취소
      await queryClient.cancelQueries({ queryKey: ['lp', lpId] });

      // 이전 값 저장
      const previousLP = queryClient.getQueryData(['lp', lpId]);

      // Optimistic Update: 즉시 좋아요 카운트 업데이트
      queryClient.setQueryData(['lp', lpId], (old: { data?: { likes?: Array<{ id: number; userId: number; lpId: number }> } } | undefined) => {
        if (!old?.data) return old;

        const currentLikes = old.data.likes || [];
        const currentLikesCount = currentLikes.length;

        // 좋아요 토글: 있으면 -1, 없으면 +1
        const newLikes = currentLikesCount > 0 
          ? currentLikes.slice(0, -1) // 마지막 요소 제거 (좋아요 취소)
          : [...currentLikes, { id: Date.now(), userId: 0, lpId: Number(lpId) }]; // 새 좋아요 추가

        return {
          ...old,
          data: {
            ...old.data,
            likes: newLikes,
          },
        };
      });

      return { previousLP };
    },
    onError: (_error, _variables, context) => {
      // 에러 발생 시 이전 값으로 롤백
      if (context?.previousLP) {
        queryClient.setQueryData(['lp', lpId], context.previousLP);
      }
      alert('좋아요 처리에 실패했습니다.');
    },
    onSettled: () => {
      // LP 상세만 refetch (목록은 건드리지 않음)
      queryClient.invalidateQueries({ queryKey: ['lp', lpId] });
    },
  });

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteMutation.mutate();
    }
  };

  const handleLike = () => {
    if (!isAuthenticated) {
      alert('로그인이 필요합니다.');
      navigate('/login', {
        state: { from: { pathname: location.pathname } },
      });
      return;
    }

    // 현재 좋아요 상태 확인
    const lpData = queryClient.getQueryData<{ data?: { likes?: Array<{ userId: number }> } }>(['lp', lpId]);
    const currentLikes = lpData?.data?.likes || [];
    const isLiked = currentLikes.length > 0; // 간단한 구현 (실제로는 현재 userId로 확인해야 함)

    likeMutation.mutate(isLiked);
  };

  const handleEdit = () => {
    navigate(`/lp/${lpId}/edit`);
  };

  return {
    handleDelete,
    handleLike,
    handleEdit,
    likeMutation,
  };
};