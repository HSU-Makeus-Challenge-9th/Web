import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar";
import Sidebar from "../pages/Sidebar";
import useSidebar from "../hooks/useSidebar";
import FloatingButton from "../components/common/FloatingButton";
import LpCreateModal from "../components/lp/LpCreateModal";
import { useState } from "react";

const HomeLayout = () => {
  const { isOpen, toggleSidebar } = useSidebar();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            transition-all
            duration-500
            ease-in-out

            ${isOpen ? "w-5/6 overflow-hidden" : "w-full overflow-y-auto"}
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

export default HomeLayout;
