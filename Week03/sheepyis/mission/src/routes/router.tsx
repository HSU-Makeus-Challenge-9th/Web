import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";

import HomePage from "../pages/home/home";
import PopularPage from "../pages/movies/popular";
import NowPlayingPage from "../pages/movies/now-playing";
import TopRatedPage from "../pages/movies/top-rated";
import UpcomingPage from "../pages/movies/upcoming";
import MovieDetailPage from "../pages/movies/movieDetail";

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
        path: "movies",
        children: [
          {
            path: "popular",
            element: <PopularPage />,
          },
          {
            path: "now-playing",
            element: <NowPlayingPage />,
          },
          {
            path: "top-rated",
            element: <TopRatedPage />,
          },
          {
            path: "upcoming",
            element: <UpcomingPage />,
          },
          {
            path: ":movieId",
            element: <MovieDetailPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
