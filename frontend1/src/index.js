import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Home,
  Contact,
  Menu,
  About,
  Loginuser,
  Newproduct,
  Signup,
} from "./pages";

import { store } from "./redux/index";
import { Provider } from "react-redux";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      {/* <Route path="menu" element={<Menu />} /> */}
      <Route path="menu/:id" element={<Menu />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Loginuser />} />
      <Route path="newproduct" element={<Newproduct />} />
      <Route path="signup" element={<Signup />} />
      <Route path="cart" element={<Cart />} />
      <Route path="success" element={<Success />} />
      <Route path="cancel" element={<Cancel />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
