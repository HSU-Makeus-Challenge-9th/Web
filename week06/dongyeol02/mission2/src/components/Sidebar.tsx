// Sidebar.tsx

import React, { useEffect, useRef } from "react";
import { useSidebar } from "../Context/SidebarContext";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const sidebarRef = useRef<HTMLDivElement>(null); // Ref 유지

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        toggleSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, toggleSidebar]);
  return (
    <>
      {/* 1. 사이드바 본체 */}
      <div
        ref={sidebarRef}
        className={`fixed top-20 left-0 w-64 h-full bg-black text-white p-5 
          transform transition-transform duration-300 z-50 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <h2 className="text-2xl font-bold mb-8">메뉴</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                onClick={toggleSidebar}
                className="block text-lg hover:text-pink-500"
              >
                찾기
              </Link>
            </li>
            <li>
              <Link
                to="/my"
                onClick={toggleSidebar}
                className="block text-lg hover:text-pink-500"
              >
                마이페이지
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
