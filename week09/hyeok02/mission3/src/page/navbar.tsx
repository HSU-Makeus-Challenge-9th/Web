import React from "react";
import { CartIcon } from "../constant/icons";
import { useStore } from "../store/store";

const Navbar: React.FC = () => {
  const { amount } = useStore();

  return (
    <div className="flex justify-between items-center px-5 py-2 bg-[#6c63ff] text-white">
      <h1 className="text-2xl font-bold">UMC PlayList</h1>
      <div className="flex items-center">
        <CartIcon />
        <span className="ml-2 w-6 h-6 bg-white text-[#6c63ff] rounded-full flex items-center justify-center font-bold">
          {amount}
        </span>
      </div>
    </div>
  );
};

export default Navbar;
