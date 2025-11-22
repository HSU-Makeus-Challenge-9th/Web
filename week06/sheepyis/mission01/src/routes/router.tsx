import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import ProtectedRoute from "./ProtectedRoute";

import LoginPage from "../pages/login/login";
import GoogleCallbackPage from "../pages/login/googleCallback";
import SignupPage from "../pages/signup/signup";
import HomePage from "../pages/home/home";
import MypagePage from "../pages/mypage/mypage";
import AddPage from "../pages/add/add";
import LpDetailPage from "../pages/lpDetail/lpDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "v1/auth/google/callback",
        element: <GoogleCallbackPage />,
      },
      {
        path: "add",
        element: <AddPage />,
      },
      {
        path: "mypage",
        element: (
          <ProtectedRoute>
            <MypagePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "lp/:id",
        element: (
          <ProtectedRoute>
            <LpDetailPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
