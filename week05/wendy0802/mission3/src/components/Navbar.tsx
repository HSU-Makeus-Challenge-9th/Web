import { NavLink, useNavigate } from "react-router-dom";
import Pagination from "./button/Pagination";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

interface NavbarProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

const navItems = [
  { path: "/", label: "홈" },
  { path: "/popular", label: "인기 영화" },
  { path: "/upcoming", label: "개봉 예정" },
  { path: "/top-rated", label: "평점 높은" },
  { path: "/now-playing", label: "상영 중" },
];
export default function Navbar({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}: NavbarProps) {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string | null>(null);

  useEffect(() => {
    // 로그인 상태가 변경될 때 닉네임 업데이트
    if (isAuthenticated) {
      setNickname(localStorage.getItem("nickname"));
    } else {
      setNickname(null);
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center gap-5 p-5 mb-5">
      <div className="flex gap-5">
        {navItems.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `px-5 py-2 rounded transition-all duration-300 font-medium
              ${isActive ? "text-blue-500 font-bold" : "text-gray-500"}`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>

      <div className="flex items-center gap-3">
        {onPageChange && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}

        {isAuthenticated ? (
          <>
            <span className="px-4 py-2 text-gray-700 font-medium">
              {nickname}님
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              로그인
            </NavLink>
            <NavLink
              to="/signup"
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            >
              회원가입
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
