import { useAppSelector } from "../hooks/useCustomRedux";
import { CartIcon } from "../icons"; // 아이콘이 없으면 텍스트로 대체 가능

const Navbar = () => {
  const { amount } = useAppSelector((state) => state.cart);

  return (
    <nav className="bg-indigo-600 p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center text-white">
        <h3 className="text-2xl font-bold">UMC PlayList</h3>
        <div className="relative cursor-pointer">
          {/* 아이콘 대용 텍스트/SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>

          <div className="absolute -top-2 -right-2 bg-indigo-300 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold text-white">
            {amount}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
