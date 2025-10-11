import React from "react";
import { NavLink } from "react-router-dom";
import { NAV_LINKS } from "./common";

const NavBar: React.FC = () => {
  return (
    <nav className="flex p-4 gap-3 bg-gray-800 shadow-md">
      {NAV_LINKS.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          // NavLink의 className 함수를 사용하여 현재 경로와 일치할 때 스타일을 적용
          className={({ isActive }) =>
            `text-lg font-medium transition duration-200 p-2 rounded-md
            ${
              isActive
                ? "text-yellow-400 font-bold bg-gray-700" // 활성화 상태 스타일
                : "text-gray-300 hover:text-white" // 비활성화 상태 스타일
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavBar;
