import useCartStore from "../store/useCartStore";

const Modal = () => {
  const { clearCart, closeModal } = useCartStore();

  return (
    <aside className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-80 p-8 rounded-lg shadow-2xl text-center z-50 animate-fade-in-up">
        <h4 className="font-bold text-lg mb-8 text-gray-800 break-keep">
          모든 음반을 장바구니에서 삭제하시겠습니까?
        </h4>
        <div className="flex justify-center gap-8">
          <button
            type="button"
            className="border border-red-500 text-red-500 px-6 py-2 rounded hover:bg-red-50 hover:text-red-600 transition font-medium"
            onClick={closeModal}
          >
            아니요
          </button>
          <button
            type="button"
            className="border border-red-500 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition font-medium shadow-md"
            onClick={() => {
              clearCart();
              closeModal();
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
