import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/cartslice";
import { closeModal } from "../redux/modalslice";
import type { RootState, AppDispatch } from "../redux/store";

const ConfirmationModal: React.FC = () => {
  const { isOpen } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch<AppDispatch>();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg text-center">
        <p className="mb-4">장바구니를 비우시겠습니까?</p>
        <div className="flex justify-around">
          <button
            onClick={() => dispatch(closeModal())}
            className="bg-gray-400 text-white px-5 py-2 rounded"
          >
            아니요
          </button>
          <button
            onClick={() => {
              dispatch(clearCart());
              dispatch(closeModal());
            }}
            className="bg-red-500 text-white px-5 py-2 rounded"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
