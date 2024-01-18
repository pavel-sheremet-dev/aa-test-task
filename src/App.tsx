import { RouterProvider } from "react-router-dom";

import "modern-normalize";

import { router } from "./routes";

export const App = () => {
  return (
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  );
};
