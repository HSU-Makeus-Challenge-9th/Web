import { Plus } from "lucide-react";

const FloatingButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="
      fixed 
      bottom-5 
      right-5

      w-14
      h-14
      rounded-full

      bg-pink-500
      text-white
      text-3xl

      flex
      justify-center
      items-center

      hover:bg-pink-600
      hover:scale-110
      active:scale-95
      transition-all
      duration-300
      ease-in-out
      cursor-pointer
      "
      >
        <Plus size={30} strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default FloatingButton;
