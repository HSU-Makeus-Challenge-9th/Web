import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import PopularMoviePage from "../pages/PopularMoviePage";
import RootLayout from "../layout/RootLayout";
import HomePage from "../pages/HomPage";
import NowPlayingPage from "../pages/NowPlayingPage";
import TopLatedPage from "../pages/TopLatedPage";
import UpcommingPage from "../pages/UpcommingPage";
import MovieDetailPage from "../pages/MovieDetailPage";
const router = createBrowserRouter([
  {
    path: "/",
    // element: <HomePage />,
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/popular",
        element: <PopularMoviePage />,
      },
      {
        path: "/now-playing",
        element: <NowPlayingPage />,
      },
      {
        path: "/top-rated",
        element: <TopLatedPage />,
      },
      {
        path: "upcomming",
        element: <UpcommingPage />,
      },
      {
        path: "movies/:movieId",
        element: <MovieDetailPage />,
      },
    ],
  },
]);
export default router;
