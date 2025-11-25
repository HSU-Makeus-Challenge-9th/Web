// Sidebar.tsx

import React, { useEffect, useRef } from "react";

import { useSidebar } from "../Context/SidebarContext";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const { isSidebarOpen, close } = useSidebar();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (isSidebarOpen && event.key === "Escape") {
        close();
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeydown);

    return () => {
      console.log(isSidebarOpen);
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [isSidebarOpen, close]);

  useEffect(() => {
    // 사이드바가 열리면 body에 no-scroll 클래스 추가
    if (isSidebarOpen) {
      document.body.classList.add("no-scroll");
    } else {
      // 닫히면 no-scroll 클래스 제거
      document.body.classList.remove("no-scroll");
    }

    // 클린업 함수: 혹시라도 컴포넌트가 언마운트될 경우 대비
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isSidebarOpen]);

  return (
    <>
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
                to="/search"
                onClick={close}
                className="block text-lg hover:text-pink-500"
              >
                찾기
              </Link>
            </li>
            <li>
              <Link
                to="/my"
                onClick={close}
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
