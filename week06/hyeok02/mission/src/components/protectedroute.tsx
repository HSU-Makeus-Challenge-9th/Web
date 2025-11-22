import { ReactNode } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  children?: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const accessToken = localStorage.getItem('accessToken');
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children || <Outlet />;
};

export default ProtectedRoute;
