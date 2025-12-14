import React from 'react';
import { useCreateLP } from '../hooks/useCreateLP';
import ImageUpload from './ImageUpload';
import TagInput from './TagInput';

interface WriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const WriteModal: React.FC<WriteModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const {
    title,
    content,
    tagInput,
    tags,
    previewUrl,
    isPending,
    setTitle,
    setContent,
    setTagInput,
    handleFileChange,
    handleAddTag,
    handleRemoveTag,
    handleSubmit,
    resetForm,
  } = useCreateLP(onClose, onSuccess);

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-800 rounded-lg w-full max-w-md">
        {/* 헤더 */}
        <div className="bg-gray-800 p-4 flex justify-end items-center rounded-t-lg">
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white text-2xl leading-none"
            disabled={isPending}
          >
            ×
          </button>
        </div>

        {/* 본문 */}
        <div className="p-6">
          {/* 이미지 영역 */}
          <div className={`relative mb-10 h-40 flex items-center justify-center`}>
            {/* LP 디스크 - 이미지 없으면 가운데, 있으면 프리뷰 아래 오른쪽으로 약간 */}
            <div className={`absolute ${previewUrl ? 'left-40 top-1/2 -translate-y-1/2' : 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'}`}>
              <ImageUpload
                onFileChange={handleFileChange}
                disabled={isPending}
              />
            </div>
            
            {/* 이미지 추가 시 프리뷰 (왼쪽 위, LP 위에) */}
            {previewUrl && (
              <div className="absolute left-15 -top-4 w-48 h-48 z-10">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* LP Name */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="LP Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-300"
              disabled={isPending}
            />
          </div>

          {/* LP Content */}
          <div className="mb-4">
            <textarea
              placeholder="LP Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-300 resize-none"
              disabled={isPending}
            />
          </div>

          {/* Tag Input */}
          <div className="mb-4">
            <TagInput
              tags={tags}
              tagInput={tagInput}
              onTagInputChange={setTagInput}
              onAddTag={handleAddTag}
              onRemoveTag={handleRemoveTag}
              disabled={isPending}
            />
          </div>

          {/* Submit 버튼 */}
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-500 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? '등록 중...' : 'Add LP'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteModal;