import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import NotFound from "../pages/not-found";
import Layout from "../layout/root-layout";
import Popular from "../pages/movies/popular";
import NowPlaying from "../pages/movies/now-playing";
import TopRated from "../pages/movies/top-rated";
import Upcoming from "../pages/movies/upcoming";
import MovieDetails from "../pages/detail"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "movies/popular",
        element: <Popular />,
      },
      {
        path: "movies/now-playing",
        element: <NowPlaying />,
      },
      {
        path: "movies/top-rated",
        element: <TopRated />,
      },
      {
        path: "movies/upcoming",
        element: <Upcoming />,
      },
      {
        path: "movies/:movieId", 
        element: <MovieDetails />,
      },
    ],
  },
]);

export default router;
