import { Outlet } from "react-router-dom";
import NavBar from "../component/NavBar";

const RootLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default RootLayout;
