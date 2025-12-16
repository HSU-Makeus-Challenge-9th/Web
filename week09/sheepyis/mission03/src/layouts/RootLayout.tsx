import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Modal from "../components/Modal/Modal";

const RootLayout = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <Navbar />
      <div className="w-[75%] mb-3">
        <Outlet />
        <Footer />
      </div>

      <Modal />
    </div>
  );
};

export default RootLayout;
