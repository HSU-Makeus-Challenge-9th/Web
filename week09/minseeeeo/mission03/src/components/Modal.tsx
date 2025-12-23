import { useCartActions } from "../store/CartStore";
import { useModalActions } from "../store/ModalStore";

const Modal = () => {
  // actions 가져오기: Cart
  const { clearCart } = useCartActions();
  // actions 가져오기: Modal
  const { closeModal } = useModalActions();

  const handleClickYes = () => {
    clearCart();
    closeModal();
  };
  const handleClickNo = () => {
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-xs">
      <div className="p-10 bg-white rounded-lg shadow-2xl">
        <p className="font-semibold mb-3">정말 삭제하시겠습니까?</p>
        <div className="flex items-center justify-center gap-2">
          <button
            className="bg-gray-200 rounded-md cursor-pointer hover:bg-gray-400 px-2 py-1 duration-300 ease-in-out"
            onClick={handleClickNo}
          >
            아니요
          </button>
          <button
            className="bg-red-500 rounded-md cursor-pointer hover:bg-red-900 text-white px-2 py-1 duration-300 ease-in-out"
            onClick={handleClickYes}
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
