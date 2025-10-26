import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import ProtectedRoute from "./ProtectedRoute";

import LoginPage from "../pages/login/login";
import SignupPage from "../pages/signup/signup";
import HomePage from "../pages/home/home";
import MypagePage from "../pages/mypage/mypage";

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
        path: "mypage",
        element: (
          <ProtectedRoute>
            <MypagePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
