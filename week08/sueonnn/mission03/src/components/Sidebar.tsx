// src/components/Sidebar.tsx
import React, { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { postLogout, deleteUser } from "../apis/auth";

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
  const { accessToken, logout: localLogout } = useAuth();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // 🔹 바깥 클릭 시 닫기 (모바일일 때만)
  useEffect(() => {
    if (!isOpen || isDesktop) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, isDesktop]);

  //  ESC 키로 닫기 (모바일 + 열려 있을 때만)
  useEffect(() => {
    if (!isOpen || isDesktop) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isDesktop, onClose]);

  //  사이드바 열렸을 때 body 스크롤 막기
  useEffect(() => {
    if (isDesktop) return;

    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalOverflow || "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, isDesktop]);

  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string) => `
    block px-4 py-3 text-gray-700 dark:text-gray-300 
    hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors
    ${
      isActive(path)
        ? "bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400"
        : ""
    }
  `;

  // 로그아웃 Mutation
  const logoutMutation = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      localLogout();
      if (!isDesktop) onClose();
      navigate("/login");
    },
    onError: (error) => {
      console.warn("Server logout failed, performing local logout.", error);
      localLogout();
      if (!isDesktop) onClose();
      navigate("/login");
      alert("로그아웃 처리에 실패했으나, 로컬 상태를 초기화했습니다.");
    },
  });

  const handleLogoutClick = () => {
    logoutMutation.mutate();
  };

  // 회원 탈퇴 Mutation
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      localLogout();
      if (!isDesktop) onClose();
      alert("회원 탈퇴가 완료되었습니다.");
      navigate("/login");
    },
    onError: (error) => {
      console.error("회원 탈퇴 실패:", error);
      alert("회원 탈퇴에 실패했습니다. (인증 만료 또는 서버 오류)");
    },
  });

  const handleDeleteAccountClick = () => {
    const confirmed = window.confirm(
      "정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다."
    );

    if (confirmed) {
      deleteMutation.mutate();
    }
  };

  return (
    <>
      {/*  모바일에서만 보이는 오버레이 + 페이드 애니메이션 */}
      {!isDesktop && (
        <div
          className={`
            fixed inset-0 bg-black bg-opacity-50 z-40 
            transition-opacity duration-300
            ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
          onClick={onClose}
          aria-hidden={!isOpen}
        />
      )}

      {/* 사이드바 패널 (데스크톱: 고정, 모바일: 슬라이드 인/아웃) */}
      <div
        ref={sidebarRef}
        className={`
          ${
            isDesktop
              ? "h-full w-64"
              : "fixed top-0 left-0 h-full w-64 z-50 shadow-lg"
          }
          bg-white dark:bg-gray-900 
          transform transition-transform duration-300 ease-out
          ${!isDesktop && (isOpen ? "translate-x-0" : "-translate-x-full")}
        `}
        role={!isDesktop ? "dialog" : undefined}
        aria-hidden={!isDesktop && !isOpen}
      >
        <div className="p-4 h-full flex flex-col">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              DOLIGO
            </h2>
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

          {/* 사이드바 상단 검색 인풋 (기존 유지) */}
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

          {/* 내비게이션 링크들 */}
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

          {/* 로그인/로그아웃 영역 */}
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
                onClick={handleLogoutClick}
                disabled={logoutMutation.isPending}
                className="w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg disabled:opacity-50"
              >
                {logoutMutation.isPending ? "로그아웃 처리 중..." : "로그아웃"}
              </button>
            )}
          </div>

          {/* 회원 탈퇴 버튼 */}
          {accessToken && (
            <div className="mt-4">
              <button
                onClick={handleDeleteAccountClick}
                disabled={deleteMutation.isPending}
                className="w-full text-center text-xs text-red-500 dark:text-red-400 hover:underline disabled:opacity-50"
              >
                {deleteMutation.isPending ? "탈퇴 처리 중..." : "탈퇴하기"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
