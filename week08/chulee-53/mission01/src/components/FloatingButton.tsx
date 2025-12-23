import { useState } from "react";
import { Plus } from "lucide-react";
import LpCreateModal from "../components/LpCreateModal"; // 모달 컴포넌트

const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full 
                   bg-pink-600 text-white flex items-center justify-center 
                   shadow-lg hover:bg-pink-500 transition-all duration-300"
      >
        <Plus size={28} />
      </button>

      {isOpen && <LpCreateModal onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default FloatingButton;
