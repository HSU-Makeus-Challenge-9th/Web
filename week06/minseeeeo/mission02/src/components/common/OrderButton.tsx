import type { PAGINATION_ORDER } from "../../types/common";

interface OrderButtonProps {
  order: PAGINATION_ORDER;
  setOrder: (order: PAGINATION_ORDER) => void;
}

const OrderButton = ({ order, setOrder }: OrderButtonProps) => {
  return (
    <div className="inline-flex bg-gray-800 rounded-full p-1">
      <button
        onClick={() => setOrder("asc")}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
          order === "asc"
            ? "bg-white text-black"
            : "bg-transparent text-white hover:text-gray-300"
        }`}
      >
        오래된순
      </button>
      <button
        onClick={() => setOrder("desc")}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
          order === "desc"
            ? "bg-white text-black"
            : "bg-transparent text-white hover:text-gray-300"
        }`}
      >
        최신순
      </button>
    </div>
  );
};

export default OrderButton;
