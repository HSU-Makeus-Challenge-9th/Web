import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import FloatingButton from "../components/FloatingButton";

const HomeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 기본 열림 상태
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 750) {
        // 1024px 미만일 때 사이드바 자동 닫기
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest("button")
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="h-dvh flex flex-col bg-neutral-950 text-white">
      <nav className="h-20">
        <Navbar />
      </nav>
      <div className="flex flex-1 overflow-hidden ">
        <aside
          ref={sidebarRef}
          className={`bg-neutral-900 ${
            isSidebarOpen ? "block w-[200px]" : "hidden"
          } overflow-hidden`}
        >
        </aside>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
          <FloatingButton />
        </main>
      </div>
    </div>
  );
};

export default HomeLayout;
