import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { closeModal } from "../../features/modal/modalSlice";
import { clearCart } from "../../features/cart/cartSlice";

const Modal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-2">
      <div className="bg-white rounded-md p-6 w-70 flex flex-col items-center gap-4">
        <p className="font-bold text-center">정말 삭제하시겠습니까?</p>

        <div className="flex items-center gap-4">
          <button
            onClick={() => dispatch(closeModal())}
            className="px-4 py-2 bg-gray-300 rounded-md cursor-pointer"
          >
            아니요
          </button>

          <button
            onClick={() => {
              dispatch(clearCart());
              dispatch(closeModal());
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
