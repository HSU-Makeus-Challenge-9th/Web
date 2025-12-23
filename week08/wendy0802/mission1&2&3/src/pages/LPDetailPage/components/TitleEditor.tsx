interface TitleEditorProps {
  isEditing: boolean;
  title: string;
  content: string;
  thumbnail: string;
  tags: string;
  canEdit: boolean;
  onTitleChange: (v: string) => void;
  onContentChange: (v: string) => void;
  onThumbChange: (v: string) => void;
  onTagsChange: (v: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onStartEdit: () => void;
  saving?: boolean;
  displayTitle: string;
}

const TitleEditor = ({
  isEditing,
  title,
  content,
  thumbnail,
  tags,
  canEdit,
  onTitleChange,
  onContentChange,
  onThumbChange,
  onTagsChange,
  onSave,
  onCancel,
  onStartEdit,
  saving,
  displayTitle,
}: TitleEditorProps) => {
  if (isEditing) {
    return (
      <div className="mb-6 sm:mb-8 space-y-3">
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
          placeholder="제목"
        />
        <textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
          rows={6}
          placeholder="내용"
        />
        <input
          type="url"
          value={thumbnail}
          onChange={(e) => onThumbChange(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
          placeholder="썸네일 URL (선택)"
        />
        <input
          type="text"
          value={tags}
          onChange={(e) => onTagsChange(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
          placeholder="태그를 , 로 구분 (선택)"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            type="button"
            className="rounded-lg border border-gray-600 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
          >
            취소
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            type="button"
            className="rounded-lg bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600 disabled:opacity-60"
          >
            {saving ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 sm:mb-8 flex items-start justify-between gap-3">
      <h1 className="text-white text-2xl sm:text-3xl font-bold wrap-break-word">
        {displayTitle}
      </h1>
      {canEdit && (
        <button
          onClick={onStartEdit}
          className="rounded-lg border border-gray-600 px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-800"
        >
          수정
        </button>
      )}
    </div>
  );
};

export default TitleEditor;
