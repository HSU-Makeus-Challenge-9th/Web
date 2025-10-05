import "./App.css"
import HomePage from "./pages/HomePage"
import MoviePage from "./pages/MoviePage"
import MovieDetailPage from "./pages/MovieDetailPage"
import NotFoundPage from "./pages/NotFoundPage"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,          
    errorElement: <NotFoundPage />,
    children: [
      { path: "movies/:category", element: <MoviePage /> },                 
      { path: "movies/:category/:movieId", element: <MovieDetailPage /> },  
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}