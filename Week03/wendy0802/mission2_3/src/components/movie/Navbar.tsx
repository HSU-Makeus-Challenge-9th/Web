import { NavLink } from "react-router-dom";
import Pagination from "../button/Pagination";

interface NavbarProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export default function Navbar({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}: NavbarProps) {
  return (
    <nav className="flex justify-between items-center gap-5 p-5 mb-5">
      <div className="flex gap-5">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-5 py-2 rounded transition-all duration-300 font-medium ${
              isActive ? "text-green-400 font-bold" : "text-gray-500"
            }`
          }
        >
          홈
        </NavLink>
        <NavLink
          to="/popular"
          className={({ isActive }) =>
            `px-5 py-2 rounded transition-all duration-300 font-medium ${
              isActive ? "text-green-400 font-bold" : "text-gray-500"
            }`
          }
        >
          인기 영화
        </NavLink>
        <NavLink
          to="/upcoming"
          className={({ isActive }) =>
            `px-5 py-2 rounded transition-all duration-300 font-medium ${
              isActive ? "text-green-400 font-bold" : "text-gray-500"
            }`
          }
        >
          개봉 예정
        </NavLink>
        <NavLink
          to="/top-rated"
          className={({ isActive }) =>
            `px-5 py-2 rounded transition-all duration-300 font-medium ${
              isActive ? "text-green-400 font-bold" : "text-gray-500"
            }`
          }
        >
          평점 높은
        </NavLink>
        <NavLink
          to="/now-playing"
          className={({ isActive }) =>
            `px-5 py-2 rounded transition-all duration-300 font-medium ${
              isActive ? "text-green-400 font-bold" : "text-gray-500"
            }`
          }
        >
          상영 중
        </NavLink>
      </div>

      {onPageChange && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </nav>
  );
}
