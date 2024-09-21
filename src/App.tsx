import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error from "./pages/Error";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/restaurant/:id",
      element: <Restaurant />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
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
