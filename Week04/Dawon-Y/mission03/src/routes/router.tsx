import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import NotFound from '../pages/NotFound';
import RootLayout from '../layout/RootLayout';
import LogInPage from '../pages/login/LogInPage';
import MultiStepSignUpPage from '../pages/signup/MultiStepSignUpPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/login', element: <LogInPage /> },
      { path: '/signup', element: <MultiStepSignUpPage /> },
    ],
  },
]);

export default router;