import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";

import "./App.css";

import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layouts/HomeLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import LpListScreen from "./pages/LpListScreen";
import LpDetailScreen from "./pages/LpDetailScreen";
import AuthGuard from "./components/AuthGuard";
import ThrottlePage from "./pages/ThrottlePage";

import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

//publicRoutes 인증 없이 접근 가능한 라우트
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        // 기존 HomePage 대신 LpListScreen 연결
        element: <LpListScreen />,
      },
      // 🚀 MODIFIED: LP 상세 페이지를 AuthGuard로 보호합니다.
      {
        path: "lp/:lpid",
        element: (
          <AuthGuard>
            <LpDetailScreen />
          </AuthGuard>
        ),
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      { path: "throttle", element: <ThrottlePage /> },
    ],
  },
];

//protectedRoutes 인증이 필요한 라우트
const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "my",
        element: <MyPage />, //일반적으로 protected route는 해당 페이지를 보여줍니다.
      },
    ],
  },
];

//모든 라우트를 병합하고 라우터에 전달
const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initiallsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
