import { useParams } from 'react-router-dom';
import { useLPDetail } from '../hooks/useLPDetail';
import { useLPActions } from '../hooks/useLPActions';
import { useAuth } from '../hooks/useAuth';
import { useLPEdit } from '../hooks/useLPEdit';
import { useAuthCheck } from '../hooks/useAuthCheck';
import LPSkeleton from '../components/LPSkeleton';
import ErrorDisplay from '../components/ErrorDisplay';
import LPDetailMain from '../components/LPDetailMain';

const LPDetailPage = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const { isAuthenticated } = useAuth();
  const { data, isLoading, isError, error, refetch } = useLPDetail(lpId!);
  const { handleDelete, handleLike, likeMutation } = useLPActions(lpId!);
  
  const lp = data?.data;
  
  const {
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
  } = useLPEdit(lpId!, lp);

  const { shouldRender } = useAuthCheck(isAuthenticated, isLoading);

  if (!shouldRender) return null;

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

  if (!lp) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <ErrorDisplay message="LP를 찾을 수 없습니다." />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 lg:p-8">
      <LPDetailMain
        lp={lp}
        lpId={lpId!}
        isAuthenticated={isAuthenticated}
        isEditing={isEditing}
        editTitle={editTitle}
        editContent={editContent}
        editTags={editTags}
        editThumbnail={editThumbnail}
        onTitleChange={setEditTitle}
        onContentChange={setEditContent}
        onTagsChange={setEditTags}
        onThumbnailChange={setEditThumbnail}
        onEdit={handleEditClick}
        onDelete={handleDelete}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
        onLike={handleLike}
        isSaving={updateMutation.isPending}
        isLiking={likeMutation.isPending}
      />
    </div>
  );
};

export default LPDetailPage;