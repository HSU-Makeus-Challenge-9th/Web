import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <header className="z-50 w-full border-b border-black bg-black/95 backdrop-blur-sm]">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="text-lg font-extrabold text-pink-500 tracking-tight"
        >
          빈 - 로그인페이지
        </Link>

        <nav className="flex items-center gap-3">
          <NavLink
            to="/login"
            className="rounded-md border border-gray-600 px-4 py-1.5 text-sm text-white hover:bg-gray-800 transition-colors"
          >
            로그인
          </NavLink>
          <NavLink
            to="/signup"
            className="rounded-md bg-pink-500 px-4 py-1.5 text-sm font-semibold text-white hover:bg-pink-600 transition-colors"
          >
            회원가입
          </NavLink>
        </nav>
      </div>
    </header>
  );
}