import { NavLink } from "react-router-dom";
import Pagination from "./button/Pagination";

interface NavbarProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

const navItems = [
{path: "/", label: "홈"},
{path: "/popular", label: "인기 영화"},
{path: "/upcoming", label: "개봉 예정"},
{path: "/top-rated", label: "평점 높은"},
{path: "/now-playing", label: "상영 중"},
];
export default function Navbar(
  {
    currentPage =1,
    totalPages= 1,
    onPageChange,
  } : NavbarProps) {
    return (
      <nav className = "flex justify-between items-center gap-5 p-5 mb-5">
        <div className = "flex gap-5">
          {navItems.map(({path, label}) => (
            <NavLink
            key = {path}
            to = {path}
            className = {({isActive}) => 
              `px-5 py-2 rounded transition-all duration-300 font-medium
              ${isActive ? "text-green-500 font-bold" : "text-gray-500"
              }`
            }
            >
              {label}
            </NavLink>
          ))}
        </div>

        <div className = "flex items-center gpa-3">
          {onPageChange && (
            <Pagination
              currentPage = {currentPage}
              totalPages = {totalPages}
              onPageChange = {onPageChange}
            />
          )}

          <NavLink
            to = "login"
            className = "px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
          로그인
            </NavLink>
          <NavLink
          to="/signup"
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
          회원가입
          </NavLink>
        </div>
      </nav>
    )
  }