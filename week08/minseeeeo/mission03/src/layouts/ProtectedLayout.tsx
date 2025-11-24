import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../pages/Navbar";
import useSidebar from "../hooks/useSidebar";
import Sidebar from "../pages/Sidebar";
import { useState } from "react";
import LpCreateModal from "../components/lp/LpCreateModal";
import FloatingButton from "../components/common/FloatingButton";

export const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const { isOpen, toggleSidebar } = useSidebar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  if (!accessToken) {
    // 현재 경로를 localStorage에 저장
    console.log("저장할 경로:", location.pathname);
    localStorage.setItem("redirectPath", location.pathname);

    alert("로그인이 필요한 기능입니다. 먼저 로그인을 해주세요.");
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="h-dvh flex flex-col bg-black">
      <Navbar />
      <main className="flex flex-1 overflow-hidden">
        {/* 사이드바 열려있을때 바깥부분 누르면 닫히게끔  */}
        {isOpen && (
          <div
            className="fixed inset-0 z-40 md:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* 사이드 바(햄버거) */}
        <aside
          className={`
            bg-gray-950
            overflow-hidden
            transition-all
            duration-500
            ease-in-out
            ${isOpen ? "w-1/6 opacity-100" : "w-0 opacity-0"}
          `}
        >
          <div className="w-64 h-full overflow-y-auto">
            <Sidebar />
          </div>
        </aside>

        {/* Outlet */}
        <section
          className={`
            bg-black
            overflow-y-auto
            transition-all
            duration-500
            ease-in-out
            ${isOpen ? "w-5/6" : "w-full"}
          `}
        >
          <Outlet />
          <FloatingButton onClick={() => setIsModalOpen(true)} />
        </section>
      </main>

      <footer></footer>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setIsModalOpen(false)}
        >
          <LpCreateModal onClose={() => setIsModalOpen(false)} />
        </div>
      )}
    </div>
  );
};
