import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";

import LoginPage from "../pages/login/login";
import SignupPage from "../pages/signup/signup";
import HomePage from "../pages/home/home";

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
    ],
  },
]);

export default router;
