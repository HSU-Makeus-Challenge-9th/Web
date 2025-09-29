import "./App.css";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import { MovieDetailPage } from "./components/MovieDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/movies/:category",
        element: <MoviePage />,
      },
      {
        path: "/movie/:movieId",
        element: <MovieDetailPage />,
      },
    ],
  },
]);

function App() {
  console.log("api key: ", import.meta.env.VITE_TMDB_KEY);
  return <RouterProvider router={router} />;
}

export default App;
