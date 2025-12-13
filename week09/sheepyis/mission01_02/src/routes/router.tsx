import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import CartPage from "../pages/CartPage";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <CartPage />,
      },
    ],
  },
]);

export default router;
