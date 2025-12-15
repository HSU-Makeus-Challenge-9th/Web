import React from "react";
import { useStore } from "../store/store";

const ConfirmationModal: React.FC = () => {
  const { isModalOpen, closeModal, clearCart } = useStore();

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded text-center">
        <p className="mb-4">장바구니를 비우시겠습니까?</p>
        <div className="flex justify-around">
          <button
            onClick={closeModal}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            아니요
          </button>
          <button
            onClick={() => {
              clearCart();
              closeModal();
            }}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
