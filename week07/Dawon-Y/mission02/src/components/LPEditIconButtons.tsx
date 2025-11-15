interface LPEditIconButtonsProps {
  onImageClick: () => void;
  onSave: () => void;
  onDelete: () => void;
  isSaving: boolean;
}

const LPEditIconButtons = ({ onImageClick, onSave, onDelete, isSaving }: LPEditIconButtonsProps) => {
  return (
    <div className="flex gap-2">
      {/* 이미지 변경 아이콘 */}
      <button
        onClick={onImageClick}
        disabled={isSaving}
        className="p-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
        title="이미지 변경"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>

      {/* 저장 아이콘 */}
      <button
        onClick={onSave}
        disabled={isSaving}
        className="p-2 text-green-500 hover:text-green-400 transition-colors disabled:opacity-50"
        title="저장"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </button>

      {/* 삭제 아이콘 */}
      <button
        onClick={onDelete}
        disabled={isSaving}
        className="p-2 text-gray-400 hover:text-red-400 transition-colors disabled:opacity-50"
        title="삭제"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default LPEditIconButtons;