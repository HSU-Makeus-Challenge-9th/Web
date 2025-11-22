import LPEditIconButtons from './LPEditIconButtons';

interface LPTitleHeaderProps {
  title: string;
  isEditing: boolean;
  isAuthenticated: boolean;
  editTitle?: string;
  isSaving?: boolean;
  onTitleChange?: (title: string) => void;
  onEdit: () => void;
  onImageClick?: () => void;
  onSave?: () => void;
  onDelete?: () => void;
}

const LPTitleHeader = ({
  title,
  isEditing,
  isAuthenticated,
  editTitle,
  isSaving,
  onTitleChange,
  onEdit,
  onImageClick,
  onSave,
  onDelete,
}: LPTitleHeaderProps) => {
  return (
    <div className="flex items-start justify-between mb-8 gap-4">
      <div className="flex-1">
        {isEditing && onTitleChange ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="LP 제목"
            className="w-full bg-transparent border-b-2 border-gray-700 text-white text-xl lg:text-2xl font-bold px-2 py-1 focus:outline-none focus:border-pink-500 transition-colors"
            disabled={isSaving}
          />
        ) : (
          <h1 className="text-xl lg:text-2xl font-bold text-white">{title}</h1>
        )}
      </div>

      {isAuthenticated && (
        <>
          {isEditing && onImageClick && onSave && onDelete ? (
            <LPEditIconButtons
              onImageClick={onImageClick}
              onSave={onSave}
              onDelete={onDelete}
              isSaving={isSaving || false}
            />
          ) : (
            <button
              onClick={onEdit}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              title="수정"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default LPTitleHeader;