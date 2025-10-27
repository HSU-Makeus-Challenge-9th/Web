import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import NotFound from '../pages/NotFound';
import RootLayout from '../layout/RootLayout';
import ProtectedLayout from '../layout/ProtectedLayout';
import LogInPage from '../pages/login/LogInPage';
import MultiStepSignUpPage from '../pages/signup/MultiStepSignUpPage';
import MyPage from '../pages/MyPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/login', element: <LogInPage /> },
      { path: '/signup', element: <MultiStepSignUpPage /> },
      
      // Protected Routes (인증이 필요한 페이지들)
      {
        element: <ProtectedLayout />,
        children: [
          { path: '/mypage', element: <MyPage /> },
        ],
      },
    ],
  },
]);

export default router;