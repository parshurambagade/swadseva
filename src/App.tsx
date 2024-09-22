import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error from "./pages/Error";
import CartPage from "./components/Cart";
import Layout from "./components/layouts/Layout";
import Orders from "./pages/Orders";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout><Home /></Layout>,
    },
    {
      path: "/restaurant/:id",
      element: <Layout><Restaurant /></Layout>,
    },
    {
      path: "/cart",
      element: <Layout><CartPage /></Layout>,
    },
    {
      path: "/orders",
      element: <Layout><Orders /></Layout>,
    },
    {
      path: "/register",
      element: <Layout><Register /></Layout>,
    },
    {
      path: "/login",
      element: <Layout><Login /></Layout>,
    },
    {
      path: "/*",
      element: <Error />
    }
  ]);

  return (
    <div>
      {" "}
      
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
