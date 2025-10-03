import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/navbar";

const Layout = () => (
  <div className="min-h-screen bg-stone-900 text-white">
    <Navbar />
		<div className="px-4 py-12 md:px-6 lg:px-8">
    <Outlet />
    </div>
  </div>
);

export default Layout;
