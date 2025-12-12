import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Common/Header/RootHeader/RootHeader";
import SideBar from "../components/Common/SideBar/SideBar";
import AddButton from "../components/Common/Button/AddButton/AddButton";
import AddModal from "../components/Common/Modal/AddModal/AddModal";
import DeleteModal from "../components/Common/Modal/DeleteModal/DeleteModal";
import { useDeleteUserMutation } from "../hooks/auth/useDeleteUserMutation";
import { useSidebar } from "../hooks/sidebar/useSidebar";

const RootLayout = () => {
  const { isOpen, toggle, close } = useSidebar();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { mutate: deleteUser } = useDeleteUserMutation();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.closest(".sidebar") || target.closest(".hamburger")) return;

      close();
    };

    if (isOpen) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen, close]);

  const handleDeleteConfirm = () => {
    deleteUser();
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <Header onToggleSidebar={toggle} />
      <div className="flex relative h-[calc(100vh-5vw)] overflow-hidden">
        <SideBar
          isOpen={isOpen}
          onDeleteClick={() => setIsDeleteModalOpen(true)}
        />

        <div
          className={`flex-1 px-[2vw] py-[1vw] transition-all ${
            isOpen ? "overflow-hidden" : "overflow-y-auto"
          }`}
        >
          <Outlet />
        </div>

        <AddButton onClick={() => setIsModalOpen(true)} />
      </div>

      {isModalOpen && <AddModal onClose={() => setIsModalOpen(false)} />}
      {isDeleteModalOpen && (
        <DeleteModal
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </>
  );
};

export default RootLayout;
