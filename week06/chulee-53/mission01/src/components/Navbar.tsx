import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

type NavbarProps = {
  onSidebarToggle?: () => void;
};

const Navbar = ({ onSidebarToggle }: NavbarProps) => {
  const navigate = useNavigate();
  const { accessToken, logout, userName } = useAuth();
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState("");

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="w-full h-20 flex items-center justify-between px-6 bg-neutral-900 text-white">
      <div className="flex items-center gap-4">
        <button
          onClick={onSidebarToggle}
          className="p-2 rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 48 48"
            fill="none"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M7.95 11.95h32m-32 12h32m-32 12h32"
            />
          </svg>
        </button>

        {/* 로고 */}
        <Link to="/" className="text-pink-500 font-bold text-2xl">
          돌려돌려LP판
        </Link>
      </div>

      <div className="flex items-center gap-3">
        {!accessToken && (
          <>
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
          </>
        )}

        {/* 검색 아이콘 */}
        {!isSearching ? (
          <button
            onClick={() => setIsSearching(true)}
            className="flex items-center gap-2 hover:text-pink-400 transition-colors"
          >
            <Search size={18} />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <Search size={18} className="text-gray-300" />
            <input
              className="border border-gray-400 rounded-sm px-2 py-1 text-black w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              onBlur={() => setIsSearching(false)}
            />
          </div>
        )}

        {accessToken && (
          <>
            <Link to="/my" className="py-2 text-sm text-gray-300">
              {userName}님 반갑습니다.
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-black rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
            >
              로그아웃
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
