import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import HomePage from "../pages/HomePage";
import MoviePage from "../pages/MoviePage";
import MovieDetailPage from "../pages/MovieDetailPage";
import NowPlayingPage from "../pages/NowPlayingPage";
import UpcomingPage from "../pages/UpcommingPage";
import TopRatedPage from "../pages/TopRatedPage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
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
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
