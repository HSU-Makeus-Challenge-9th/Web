import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const HomeLayout = () => {
  return (
    <div className="grid min-h-dvh grid-rows-[auto,1fr]">
      <NavBar />
      <main className="flex-1">
        <Outlet />{" "}
      </main>
      <footer>푸터</footer>{" "}
    </div>
  );
};
export default HomeLayout;
