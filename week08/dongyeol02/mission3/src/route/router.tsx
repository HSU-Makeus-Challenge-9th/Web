import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Homepage from "../pages/Homepage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import MyPage from "../pages/MyPage";
import ProtectedRoute from "./ProtectedRoute";
import GoogleLoginPage from "../pages/GoogleLoginPage";
import LpDetailPage from "../pages/LpDetailPage";
import { CreateLp } from "../pages/CreateLp";
import SearchPage from "../pages/SearchPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/v1/auth/google/callback", element: <GoogleLoginPage /> },
      { path: "/search", element: <SearchPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/my", element: <MyPage /> },
          { path: "/create", element: <CreateLp /> },
          { path: "/lp/:lpid", element: <LpDetailPage /> },
        ],
      },
    ],
  },
]);
