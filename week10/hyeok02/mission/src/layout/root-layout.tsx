import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/navbar/navbar";

const Layout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="min-h-screen bg-stone-900 text-white">
      <Navbar />
      <div className={isAuthPage ? "" : "px-4 py-12 md:px-6 lg:px-8"}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
