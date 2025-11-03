import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Common/Header/RootHeader/RootHeader";
import SideBar from "../components/Common/SideBar/SideBar";
import AddButton from "../components/Common/Button/AddButton/AddButton";

const RootLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

      <div className="flex relative h-[calc(100vh-5vw)]">
        <SideBar isOpen={isSidebarOpen} />
        <Outlet />
        <AddButton />
      </div>
    </>
  );
};

export default RootLayout;
