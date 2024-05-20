import React, { lazy } from "react";
import App, { authLoader } from "../App";
import { createBrowserRouter, Navigate } from "react-router-dom";

const routes = [
    {
        path: "/",
        element: <App />,
        loader: authLoader,
        children: []
    }
]

export { routes };

export default createBrowserRouter(routes);