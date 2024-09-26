import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error from "./pages/Error";
import CartPage from "./components/Cart";
import Layout from "./components/layouts/Layout";
import Orders from "./pages/Orders";
import { ResContextProvider } from "./contexts/ResContext";
import { CartContextProvider } from "./contexts/CartContext";
import Success from "./pages/Success";
import ProtectedSuccessRoutes from "./components/ProtectedSuccessRoutes";
import { OrdersContextProvider } from "./contexts/OrdersContext";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <Home />
        </Layout>
      ),
    },
    {
      path: "/restaurant/:resId",
      element: (
        <Layout>
          <Restaurant />
        </Layout>
      ),
    },
    {
      path: "/cart",
      element: (
        <Layout>
          <CartPage />
        </Layout>
      ),
    },
    {
      path: "/orders",
      element: (
        <Layout>
          <Orders />
        </Layout>
      ),
    },
    {
      path: "/register",
      element: (
        <Layout>
          <Register />
        </Layout>
      ),
    },
    {
      path: "/login",
      element: (
        <Layout>
          <Login />
        </Layout>
      ),
    },
    {
      path: "/success",
      element: (
        <Layout>
          <ProtectedSuccessRoutes children={<Success />} />
        </Layout>
      ),
    },
    {
      path: "/*",
      element: <Error />,
    },
  ]);

  return (
    <ResContextProvider>
      <OrdersContextProvider>
        <CartContextProvider>
          <RouterProvider router={router} />
        </CartContextProvider>
      </OrdersContextProvider>
    </ResContextProvider>
  );
};

export default App;
