import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full h-20 flex items-center justify-between px-6 bg-neutral-900 text-white">
      {/* 로고 */}
      <Link to="/" className="text-pink-500 font-bold text-2xl">
        돌려돌려LP판
      </Link>

      {/* 버튼 영역 */}
      <div className="flex gap-3">
        <Link
          to="/login"
          className="px-4 py-2 bg-black rounded-md hover:bg-gray-800 transition-colors"
        >
          로그인
        </Link>
        <Link
          to="/signup"
          className="px-4 py-2 bg-pink-500 rounded-md hover:bg-pink-700 transition-colors"
        >
          회원가입
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
