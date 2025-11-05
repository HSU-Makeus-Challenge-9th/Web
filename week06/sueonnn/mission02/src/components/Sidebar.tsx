import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isDesktop?: boolean;
}

export const Sidebar = ({
  isOpen,
  onClose,
  isDesktop = false,
}: SidebarProps) => {
  const { accessToken, logout } = useAuth(); // 로그아웃 기능 사용을 위해 logout 추가
  const sidebarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // 🚀 사이드바 외부 클릭 시 닫기 로직 (모바일/토글 모드에서만 작동)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen && !isDesktop) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, isDesktop]);

  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string) => `
    block px-4 py-3 text-gray-700 dark:text-gray-300 
    hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors
    ${isActive(path) ? "bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400" : ""}
  `;

  // 로그아웃 핸들러
  const handleLogout = async () => {
    if (!isDesktop) onClose(); // 모바일 뷰에서는 닫기
    await logout();
  };

  return (
    <>
      {/* 모바일 오버레이 (isDesktop이 false일 때만 보임) */}
      {!isDesktop && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />
      )}

      <div
        ref={sidebarRef}
        className={`
          ${isDesktop ? "h-full" : "fixed top-0 left-0 h-full w-64 z-50 shadow-lg"}
          bg-white dark:bg-gray-900 transform transition-transform duration-300
          ${!isDesktop && (isOpen ? "translate-x-0" : "-translate-x-full")}
        `}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              DOLIGO
            </h2>
            {/* 닫기 버튼 (isDesktop이 false일 때만 보임) */}
            {!isDesktop && (
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>

          <div className="flex items-center px-4 py-2 mb-6">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="mr-2"
            >
              <path
                d="M8 15L12.5 10.5L8 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              placeholder="찾기"
              className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <nav className="flex-1 space-y-2">
            <Link
              to="/"
              onClick={!isDesktop ? onClose : undefined}
              className={linkClass("/")}
            >
              <div className="flex items-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="mr-3"
                >
                  <path
                    d="M10 3L3 9V17H7V12H13V17H17V9L10 3Z"
                    fill="currentColor"
                  />
                </svg>
                메인 페이지
              </div>
            </Link>

            {accessToken && (
              <Link
                to="/my"
                onClick={!isDesktop ? onClose : undefined}
                className={linkClass("/my")}
              >
                <div className="flex items-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="mr-3"
                  >
                    <circle cx="10" cy="7" r="3" fill="currentColor" />
                    <path
                      d="M3 17C3 14 6 11 10 11C14 11 17 14 17 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  마이페이지
                </div>
              </Link>
            )}
          </nav>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            {!accessToken ? (
              <>
                <Link
                  to="/login"
                  onClick={!isDesktop ? onClose : undefined}
                  className={linkClass("/login")}
                >
                  로그인
                </Link>
                <Link
                  to="/signup"
                  onClick={!isDesktop ? onClose : undefined}
                  className={linkClass("/signup")}
                >
                  회원가입
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                로그아웃
              </button>
            )}
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
            탈퇴하기
          </div>
        </div>
      </div>
    </>
  );
};
