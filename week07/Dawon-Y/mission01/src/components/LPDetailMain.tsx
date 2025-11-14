import { useRef } from 'react';
import LPDetailHeader from './LPDetailHeader';
import LPTitleHeader from './LPTitleHeader';
import LPEditForm from './LPEditForm';
import LPContentDisplay from './LPContentDisplay';
import LPLikeButton from './LPLikeButton';
import CommentSection from './CommentSection';
import type { LP } from '../types/lp';

interface LPDetailMainProps {
  lp: LP;
  lpId: string;
  isAuthenticated: boolean;
  isEditing: boolean;
  editTitle: string;
  editContent: string;
  editTags: string[];
  editThumbnail: string | File;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  onTagsChange: (tags: string[]) => void;
  onThumbnailChange: (file: File) => void;
  onEdit: () => void;
  onDelete: () => void;
  onSave: () => void;
  onCancel: () => void;
  onLike: () => void;
  isSaving: boolean;
  isLiking: boolean;
}

const LPDetailMain = ({
  lp,
  lpId,
  isAuthenticated,
  isEditing,
  editTitle,
  editContent,
  editTags,
  editThumbnail,
  onTitleChange,
  onContentChange,
  onTagsChange,
  onThumbnailChange,
  onEdit,
  onDelete,
  onSave,
  onLike,
  isSaving,
  isLiking,
}: LPDetailMainProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const authorName = lp.author?.name || '익명';
  const tagStrings = lp.tags?.map((tag) => (typeof tag === 'string' ? tag : tag.name)) || [];

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onThumbnailChange(file);
    }
  };

  const getThumbnailUrl = () => {
    if (editThumbnail instanceof File) {
      return URL.createObjectURL(editThumbnail);
    }
    return editThumbnail || lp.thumbnail;
  };

  return (
    <div className="w-full max-w-3xl bg-gray-900 rounded-2xl p-8 lg:p-12">
      <LPDetailHeader authorName={authorName} createdAt={lp.createdAt} />

      <LPTitleHeader
        title={lp.title}
        isEditing={isEditing}
        isAuthenticated={isAuthenticated}
        editTitle={editTitle}
        isSaving={isSaving}
        onTitleChange={onTitleChange}
        onEdit={onEdit}
        onImageClick={handleImageClick}
        onSave={onSave}
        onDelete={onDelete}
      />

      {/* 썸네일 이미지 */}
      <div className="aspect-square max-w-2xl mx-auto mb-6 overflow-hidden rounded-xl">
        <img
          src={getThumbnailUrl()}
          alt={editTitle || lp.title}
          className="w-full h-full object-cover"
        />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* 내용 및 태그 */}
      {isEditing ? (
        <LPEditForm
          title={editTitle}
          content={editContent}
          tags={editTags}
          onTitleChange={onTitleChange}
          onContentChange={onContentChange}
          onTagsChange={onTagsChange}
          disabled={isSaving}
        />
      ) : (
        <LPContentDisplay content={lp.content} tags={tagStrings} />
      )}

      <LPLikeButton likes={lp.likes?.length || 0} onLike={onLike} isPending={isLiking} />

      <CommentSection lpId={lpId} />
    </div>
  );
};

export default LPDetailMain;