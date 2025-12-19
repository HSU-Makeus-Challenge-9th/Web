// src/layouts/RootLayoutContent.tsx (새 파일)
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useSidebar } from "../Context/SidebarContext";

const RootLayoutContent: React.FC = () => {
  const { isSidebarOpen } = useSidebar();

  const sidebarWidth = "256px";

  return (
    <div className="min-h-screen">
      <Navbar />

      <Sidebar />

      <div
        className="transition-all duration-300"
        style={{
          marginLeft: isSidebarOpen ? sidebarWidth : "0",

          paddingTop: "80px",

          width: isSidebarOpen ? `calc(100% - ${sidebarWidth})` : "100%",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayoutContent;
