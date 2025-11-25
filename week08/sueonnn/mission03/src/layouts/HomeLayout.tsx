import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Sidebar } from "../components/Sidebar";
import { useState } from "react";
import { LPCreationModal } from "../components/LPCreationModal";
import { useSidebar } from "../hooks/useSidebar";

const HomeLayout = () => {
  const { isOpen, open, close } = useSidebar();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);
  const handleFabClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="h-dvh flex">
      {/* 데스크톱 사이드바 - 항상 보임 */}
      <div className="hidden md:block w-64 fixed top-0 left-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-30">
        <Sidebar isOpen={true} onClose={() => {}} isDesktop={true} />
      </div>

      {/* 모바일 사이드바 - 햄버거 메뉴로 열고 닫기 */}
      <div className="md:hidden">
        <Sidebar isOpen={isOpen} onClose={close} isDesktop={false} />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Navbar: onMenuClick에서 사이드바 열기 */}
        <Navbar onMenuClick={open} />

        <main className="flex-1 pt-16 overflow-auto relative">
          <Outlet />

          {/* 플로팅 추가 버튼 */}
          <button
            onClick={handleFabClick}
            className="fixed bottom-8 right-8 bg-pink-500 hover:bg-pink-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-105 z-40"
            aria-label="새 항목 추가"
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
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </main>

        <Footer />
      </div>

      <LPCreationModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default HomeLayout;
