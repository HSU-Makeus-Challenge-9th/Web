import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";

import SearchPage from "../pages/Search/Search";
import PopularPage from "../pages/Movies/Popular";
import NowPlayingPage from "../pages/Movies/NowPlaying";
import TopRatedPage from "../pages/Movies/TopRated";
import UpcomingPage from "../pages/Movies/Upcoming";
import MovieDetailPage from "../pages/Movies/MovieDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <SearchPage />,
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
