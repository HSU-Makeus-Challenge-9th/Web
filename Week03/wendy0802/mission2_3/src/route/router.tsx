import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import MoviePage from "../pages/MoviePage";
import MovieDetailPage from "../pages/MovieDetailPage";
import NowPlayingPage from "../pages/NowPlayingPage";
import UpcomingPage from "../pages/UpcommingPage";
import TopRatedPage from "../pages/TopRatedPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <div>홈 페이지</div>,
      },
      {
        path: "popular",
        element: <MoviePage />,
      },
      {
        path: "upcoming",
        element: <UpcomingPage />,
      },
      {
        path: "top-rated",
        element: <TopRatedPage />,
      },
      {
        path: "now-playing",
        element: <NowPlayingPage />,
      },
      {
        path: "movies/:movieId",
        element: <MovieDetailPage />,
      },
    ],
  },
]);
