import { useAppDispatch } from "../hooks/useCustomRedux";
import { clearCart } from "../slices/cartSlice";
import { closeModal } from "../slices/modalSlice";

const Modal = () => {
  const dispatch = useAppDispatch();

  return (
    <aside className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-white w-80 p-8 rounded-lg shadow-lg text-center z-50">
        <h4 className="font-bold text-lg mb-8 text-gray-800">
          정말 삭제하시겠습니까?
        </h4>
        <div className="flex justify-center gap-8">
          <button
            type="button"
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 transition font-medium"
            onClick={() => {
              dispatch(closeModal());
            }}
          >
            아니요
          </button>
          <button
            type="button"
            className="bg-red-500 text-gray-700 px-6 py-2 rounded hover:bg-red-600 transition font-medium"
            onClick={() => {
              dispatch(clearCart());
              dispatch(closeModal());
            }}
          >
            네
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
