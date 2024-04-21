import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import Home from "./pages/Home";
import ErrorLayout from "./pages/Error";
import Status from "./pages/Status";
import Auth from "./pages/Auth";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    errorElement: <ErrorLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "status",
        element: <Status />,
      },
    ],
  },
  {
    path: "auth",
    element: <Auth />,
  }
]);

export default router;
