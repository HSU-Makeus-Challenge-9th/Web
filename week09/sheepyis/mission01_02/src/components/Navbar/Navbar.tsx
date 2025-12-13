import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

const Navbar = () => {
  const amount = useSelector((state: RootState) => state.cart.amount);

  return (
    <div className="flex justify-between w-full bg-blue-950 text-white px-4 py-1 text-lg">
      <p
        className="font-bold cursor-pointer"
        onClick={() => window.location.reload()}
      >
        Inseo Yang
      </p>
      <div className="flex gap-2 items-center">
        <FaShoppingCart size={15} />
        <p>{amount}</p>
      </div>
    </div>
  );
};

export default Navbar;
