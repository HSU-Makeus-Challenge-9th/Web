import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const HomeLayout = () => {
  return (
    <div className="min-h-dvh flex flex-col bg-black text-white">
      <NavBar />

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-black text-zinc-400 border-t border-zinc-800 py-4 text-center">
      </footer>
    </div>
  );
};

export default HomeLayout;