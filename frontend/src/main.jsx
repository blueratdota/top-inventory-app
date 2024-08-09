import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import AllItems from "./pages/AllItems.jsx";
import AllCategories from "./pages/AllCategories.jsx";
import NewItem from "./pages/NewItem.jsx";
import NewCategory from "./pages/NewCategory.jsx";
import Admin from "./pages/Admin.jsx";
import Signup from "./pages/Signup.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "items",
        element: <AllItems />
      },
      { path: "items/new-item", element: <NewItem /> },
      { path: "categories", element: <AllCategories /> },
      { path: "categories/new-category", element: <NewCategory /> },
      { path: "admin", element: <Admin /> },
      { path: "sign-up", element: <Signup /> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
