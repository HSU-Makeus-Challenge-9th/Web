import { FaPlus } from "react-icons/fa";

const FloatingButton = () => {
    const handleClick = () => {
        
    }
  return (
    <button
    onClick={handleClick}
    className="fixed bottom-10 right-10 bg-pink-500 text-white px-4 py-4 rounded-full"
    >
    <FaPlus />
    </button>
  );
};

export default FloatingButton;