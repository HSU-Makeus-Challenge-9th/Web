import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import { useEffect } from "react";
import useSidebar from "../hooks/sidebar/useSidebar";

const Layout = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  const { isOpen, open, close, toggle } = useSidebar();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        open();
      } else {
        close();
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [open, close]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col">
      <Navbar onToggleSidebar={toggle} />

      <div className="flex relative">
        {!isAuthPage && (
          <>
            <div
              className={`fixed inset-0 z-30 bg-black/40 transition-opacity duration-300 md:hidden ${
                isOpen
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
              onClick={close}
            />

            <div
              className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-out md:static ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <Sidebar />
            </div>
          </>
        )}

        <div
          className={`flex-1 ${
            isAuthPage ? "flex justify-center items-center" : ""
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
