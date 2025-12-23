// src/components/Navbar.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { SearchModal } from "./SearchModal";

interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar = ({ onMenuClick }: NavbarProps) => {
  const { accessToken, userName, logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-md w-full sticky top-0 z-20">
        <div className="mx-auto max-w-7xl flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
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

            <Link
              to="/"
              className="text-xl font-bold text-gray-900 dark:text-white"
            >
              스피닝 돌림판
            </Link>
          </div>

          <div className="flex items-center space-x-6 xl:space-x-8">
            {/* 비로그인 */}
            {!accessToken && (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
                >
                  로그인
                </Link>
                <Link
                  to="/signup"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
                >
                  회원가입
                </Link>
              </div>
            )}

            {/* 로그인 */}
            {accessToken && (
              <div className="flex items-center space-x-4">
                {/* 🔍 검색 모달 열기 버튼 */}
                <button
                  type="button"
                  onClick={openSearch}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
                >
                  검색
                </button>

                <div className="flex items-center space-x-2">
                  {userName && (
                    <span className="text-gray-700 dark:text-gray-300 whitespace-nowrap text-sm">
                      {userName}님 반갑습니다.
                    </span>
                  )}
                  <button
                    onClick={logout}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-500 whitespace-nowrap text-sm"
                  >
                    로그아웃
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* 검색 모달 */}
      {accessToken && (
        <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
      )}
    </>
  );
};
