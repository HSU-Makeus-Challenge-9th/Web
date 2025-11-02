import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useLPDetail } from '../hooks/useLPDetail';
import { useLPActions } from '../hooks/useLPActions';
import { useAuth } from '../hooks/useAuth';
import LPSkeleton from '../components/LPSkeleton';
import ErrorDisplay from '../components/ErrorDisplay';
import LPDetailHeader from '../components/LPDetailHeader';
import LPActionButtons from '../components/LPActionButtons';
import LPThumbnail from '../components/LPThumbnail';
import LPTags from '../components/LPTags';
import LPLikeButton from '../components/LPLikeButton';
import CommentSection from '../components/CommentSection';

const LPDetailPage = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const hasShownAlert = useRef(false);

  const { data, isLoading, isError, error, refetch } = useLPDetail(lpId!);
  const { handleDelete, handleLike, handleEdit, likeMutation } = useLPActions(lpId!);

  // 비로그인 사용자 체크
  useEffect(() => {
    if (!isLoading && !isAuthenticated && !hasShownAlert.current) {
      hasShownAlert.current = true;
      const shouldRedirect = window.confirm(
        '로그인이 필요한 서비스입니다. 로그인을 해주세요!'
      );
      if (shouldRedirect) {
        navigate('/login', {
          state: { from: location.pathname },
          replace: true,
        });
      } else {
        navigate('/');
      }
    }
  }, [isAuthenticated, isLoading, navigate, location]);

  if (!isAuthenticated && !isLoading) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="aspect-square max-w-2xl mx-auto">
          <LPSkeleton />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <ErrorDisplay
          message={error instanceof Error ? error.message : 'LP를 불러오는데 실패했습니다.'}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  const lp = data?.data;

  if (!lp) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <ErrorDisplay message="LP를 찾을 수 없습니다." />
      </div>
    );
  }

  const authorName = lp.author?.name || '익명';

  return (
    <div className="min-h-screen flex items-center justify-center p-4 lg:p-8">
      <div className="w-full max-w-3xl bg-gray-900 rounded-2xl p-8 lg:p-12">
        <LPDetailHeader authorName={authorName} createdAt={lp.createdAt} />

        <div className="flex items-start justify-between mb-8 gap-4">
          <h1 className="text-xl lg:text-2xl font-bold text-white flex-1">{lp.title}</h1>
          {isAuthenticated && <LPActionButtons onEdit={handleEdit} onDelete={handleDelete} />}
        </div>

        <LPThumbnail src={lp.thumbnail} alt={lp.title} />

        <div className="mb-6">
          <p className="text-gray-300 whitespace-pre-wrap leading-relaxed text-sm">{lp.content}</p>
        </div>

        <LPTags tags={lp.tags} />

        <LPLikeButton likes={lp.likes?.length || 0} onLike={handleLike} isPending={likeMutation.isPending} />

        {/* 댓글 섹션 */}
        <CommentSection lpId={lpId!} />
      </div>
    </div>
  );
};

export default LPDetailPage;