
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from "./pages/LoginPage";
import HomeLayout from './layouts/HomeLayout';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';
import GoogleCallbackPage from './pages/GoogleCallbackPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
  children: [
    { index: true, element: <HomePage /> },
    { path: "login", element: <LoginPage /> },
    { path: "signup", element: <SignupPage /> },
    { path: "my", element: <MyPage /> },
    { path: "auth/google/callback", element: <GoogleCallbackPage /> }
  ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;