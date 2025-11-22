import { Outlet } from "react-router-dom";
import Navbar from "../components/movie/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
