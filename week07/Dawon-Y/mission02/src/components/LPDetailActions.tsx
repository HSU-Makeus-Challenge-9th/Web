interface LPDetailActionsProps {
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving?: boolean;
}

const LPDetailActions = ({
  isEditing,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  isSaving,
}: LPDetailActionsProps) => {
  if (isEditing) {
    return (
      <div className="flex gap-2">
        <button
          onClick={onSave}
          disabled={isSaving}
          className="p-2 text-green-500 hover:text-green-400 transition-colors disabled:opacity-50"
          title="저장"
        >
          ✓
        </button>
        <button
          onClick={onCancel}
          disabled={isSaving}
          className="p-2 text-gray-400 hover:text-gray-300 transition-colors disabled:opacity-50"
          title="취소"
        >
          ✕
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={onEdit}
        className="p-2 text-gray-400 hover:text-white transition-colors"
        title="수정"
      >
        ✏️
      </button>
      <button
        onClick={onDelete}
        className="p-2 text-gray-400 hover:text-white transition-colors"
        title="삭제"
      >
        🗑️
      </button>
    </div>
  );
};

export default LPDetailActions;