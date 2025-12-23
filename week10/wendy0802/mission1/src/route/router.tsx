import { createBrowserRouter } from 'react-router-dom';
import MovieSearchPage from '../pages/MoviePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MovieSearchPage />,
  },
]);