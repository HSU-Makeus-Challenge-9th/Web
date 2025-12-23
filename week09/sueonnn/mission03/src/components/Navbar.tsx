import useCartStore from "../store/useCartStore";
import { CartIcon } from "../icons";

const Navbar = () => {
  const { amount } = useCartStore();

  return (
    <nav className="bg-indigo-600 px-8 py-4 shadow-md">
      <div className="max-w-7xl w-full mx-auto flex justify-between items-center text-white">
        <h3 className="text-3xl font-bold tracking-wide">UMC PlayList</h3>
        <div className="relative cursor-pointer hover:scale-110 transition-transform">
          <CartIcon />
          <div className="absolute -top-2 -right-2 bg-indigo-300 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold text-white shadow-sm">
            {amount}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
