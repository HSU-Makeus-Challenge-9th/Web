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

  const likeMutation = useMutation({
    mutationFn: () => toggleLPLike(lpId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lp', lpId] });
      queryClient.invalidateQueries({ queryKey: ['lps'] });
    },
    onError: () => {
      alert('좋아요 처리에 실패했습니다.');
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
    likeMutation.mutate();
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