import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-gray-700/40 bg-linear-to-b from-gray-800 via-gray-900 to-gray-950 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-lg text-gray-200 transition hover:bg-white/10 hover:text-white"
        >
          ×
        </button>
        <div className="max-h-[85vh] overflow-y-auto p-8">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
