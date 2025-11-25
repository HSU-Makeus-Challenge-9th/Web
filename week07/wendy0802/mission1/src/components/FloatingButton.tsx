import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Modal from "./Modal";
import LPCreate from "../pages/LPCreate";

const FloatingButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="fixed bottom-10 right-10 bg-pink-500 text-white px-4 py-4 rounded-full"
      >
        <FaPlus />
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <LPCreate onClose={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default FloatingButton;
