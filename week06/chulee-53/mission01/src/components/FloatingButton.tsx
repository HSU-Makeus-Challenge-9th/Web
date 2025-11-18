import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

const FloatingButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/lps/create")}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full 
                 bg-pink-600 text-white flex items-center justify-center 
                 shadow-lg hover:bg-pink-500 transition-all duration-300"
    >
      <Plus size={28} />
    </button>
  );
};

export default FloatingButton;
