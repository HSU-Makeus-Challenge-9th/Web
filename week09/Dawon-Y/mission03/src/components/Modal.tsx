import { useStore } from '../store/useStore';

const Modal = () => {
  const isModalOpen = useStore((state) => state.isModalOpen);
  const closeModal = useStore((state) => state.closeModal);
  const clearCart = useStore((state) => state.clearCart);

  if (!isModalOpen) return null;

  const handleClose = () => {
    closeModal();
  };

  const handleConfirm = () => {
    clearCart();
    closeModal();
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-8 max-w-md w-full mx-4'>
        <h3 className='text-xl font-bold mb-4'>정말 삭제하시겠습니까?</h3>
        <p className='text-gray-600 mb-6'>장바구니의 모든 항목이 삭제됩니다.</p>
        <div className='flex gap-3 justify-end'>
          <button
            className='px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition font-semibold'
            onClick={handleClose}
          >
            아니요
          </button>
          <button
            className='px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition font-semibold'
            onClick={handleConfirm}
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;