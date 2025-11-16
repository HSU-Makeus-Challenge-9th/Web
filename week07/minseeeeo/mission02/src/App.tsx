import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";

// 스타일 import
import "./App.css";

// 컴포넌트 import
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layouts/HomeLayout";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import { AuthProvider } from "./provider/AuthProvider";
import { ProtectedLayout } from "./layouts/ProtectedLayout";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";
import SidebarProvider from "./provider/SidebarProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LpDetailsPage from "./pages/LpDetailsPage";

const queryClient = new QueryClient();

// publicRoutes: 인증 없이 접근 가능한 라우트
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "/v1/auth/google/callback",
        element: <GoogleLoginRedirectPage />,
      },
    ],
  },
];

// protectedRoutes: 인증이 필요한 라우트
const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "my", element: <MyPage /> },
      { path: "/v1/lps/:id", element: <LpDetailsPage /> },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SidebarProvider>
          <RouterProvider router={router} />
        </SidebarProvider>
      </AuthProvider>

      {/* 개발시에만 devTools 뜨도록 */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
