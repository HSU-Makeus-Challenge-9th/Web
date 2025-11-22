interface DeleteAccountModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const DeleteAccountModal = ({ onConfirm, onCancel, isLoading }: DeleteAccountModalProps) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isLoading) {
      onCancel();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-800 bg-opacity-90 rounded-2xl w-full max-w-md p-8 relative backdrop-blur-sm">
        {/* 닫기 버튼 */}
        <button
          onClick={onCancel}
          disabled={isLoading}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl leading-none disabled:opacity-50"
        >
          ×
        </button>

        {/* 메시지 */}
        <div className="text-center mb-8 pt-4">
          <h2 className="text-white text-xl font-medium">
            정말 탈퇴하시겠습니까?
          </h2>
        </div>

        {/* 버튼들 */}
        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '탈퇴 중...' : '예'}
          </button>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;