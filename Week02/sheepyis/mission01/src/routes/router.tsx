import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import TodoPage from "../pages/todo/todo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <TodoPage />,
      },
    ],
  },
]);

export default router;
