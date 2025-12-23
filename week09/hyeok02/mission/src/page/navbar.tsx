import React from "react";
import { useSelector } from "react-redux";
import { CartIcon } from "../constant/icons";
import type { RootState } from "../redux/store";

const Navbar: React.FC = () => {
  const { amount } = useSelector((state: RootState) => state.cart);

  return (
    <div className="flex justify-between items-center px-5 py-2 bg-[#6c63ff] text-white">
      <h1 className="text-2xl font-bold">UMC PlayList</h1>
      <div className="relative flex items-center">
        <CartIcon />
        <span className="ml-2 w-6 h-6 flex items-center justify-center rounded-full bg-white text-[#6c63ff] font-bold">
          {amount}
        </span>
      </div>
    </div>
  );
};

export default Navbar;
