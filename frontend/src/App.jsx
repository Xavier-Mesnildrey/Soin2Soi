import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss"
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";

import { CookiesProvider } from "react-cookie";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/accueil",
    element: <Home />,
  },
  {
    path: "/inscription",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <CookiesProvider>
    <RouterProvider router={router} />
  </CookiesProvider>
);
