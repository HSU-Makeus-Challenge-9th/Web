// ClearCartModal.tsx
type ClearCartModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const ClearCartModal = ({
  isOpen,
  onCancel,
  onConfirm,
}: ClearCartModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          장바구니를 모두 비우시겠습니까?
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          이 작업은 되돌릴 수 없습니다.
        </p>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            onClick={onCancel}
          >
            아니요
          </button>
          <button
            type="button"
            className="rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
            onClick={onConfirm}
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClearCartModal;
