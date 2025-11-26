import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import FloatingButton from "../components/common/FloatingButton";
import CreateLpModal from "../components/lps/CreateLpModal";

export const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="h-dvh flex flex-col">
      <Navbar onToggleSidebar={() => {}} />
      <main className="flex-1">
        <Outlet />
      </main>

      <footer></footer>
      
      <FloatingButton 
        onClick={() => setIsModalOpen(true)} 
        ariaLabel="LP 추가" 
        variant="add"
      />
      
      <CreateLpModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};