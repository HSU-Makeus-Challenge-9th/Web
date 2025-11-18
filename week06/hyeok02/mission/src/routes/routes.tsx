import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import NotFound from "../pages/not-found";
import Layout from "../layout/root-layout";
import LoginPage from "../pages/login";
import SignUpPage from "../pages/signup";
import OAuthCallbackPage from "../pages/googlelogin";
import LPDetailPage from "../pages/lp-detail";
import MyPage from "../pages/mypage"; // ✅ 추가

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignUpPage /> },
      { path: "v1/auth/google/callback", element: <OAuthCallbackPage /> },
      { path: "lp/:Lpid", element: <LPDetailPage /> },
      { path: "mypage", element: <MyPage /> }, 
    ],
  },
]);

export default router;
