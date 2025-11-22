import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export const ProtectedLayout = () => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>

      <footer></footer>
    </div>
  );
};