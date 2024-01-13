import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App";
import { HomePage } from "./pages/HomePage";
import { NotFoundErrorPage } from "./pages/NotFoundErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>,
      },
      {
        path: "*",
        element: <NotFoundErrorPage></NotFoundErrorPage>,
      },
    ],
  },
]);

export const Routes = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
