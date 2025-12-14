import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layout/RootLayout';
import ProtectedLayout from '../layout/ProtectedLayout';
import HomePage from '../pages/HomePage';
import LogInPage from '../pages/login/LogInPage';
import SignUpPage from '../pages/signup/SignUpPage';
import MyPage from '../pages/MyPage';
import LPDetailPage from '../pages/LPDetailPage';
import GoogleCallback from '../pages/auth/GoogleCallback';
import SearchPage from '../pages/SearchPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'login',
        element: <LogInPage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      },
      {
        path: 'lp/:lpId',
        element: <LPDetailPage />,
      },
      {
        path: 'v1/auth/google/callback',
        element: <GoogleCallback />,
      },
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: 'mypage',
            element: <MyPage />,
          },
        ],
      },
    ],
  },
]);

export default router;