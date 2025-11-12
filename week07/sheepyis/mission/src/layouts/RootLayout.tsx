import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Common/Header/RootHeader/RootHeader";
import SideBar from "../components/Common/SideBar/SideBar";
import AddButton from "../components/Common/Button/AddButton/AddButton";
import AddModal from "../components/Common/Modal/AddModal/AddModal";

const RootLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".sidebar") || target.closest(".hamburger")) return;
      setIsSidebarOpen(false);
    };

    if (isSidebarOpen) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <>
      <Header onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
      <div className="flex relative h-[calc(100vh-5vw)] overflow-hidden">
        <SideBar isOpen={isSidebarOpen} />

        <div className="flex-1 overflow-y-auto px-[2vw] py-[1vw]">
          <Outlet />
        </div>

        <AddButton onClick={() => setIsModalOpen(true)} />
      </div>
      {isModalOpen && <AddModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default RootLayout;
