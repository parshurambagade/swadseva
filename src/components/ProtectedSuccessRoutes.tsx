import { useContext } from "react";
import CartContext from "../contexts/CartContext";
import { Navigate } from "react-router-dom";

const ProtectedSuccessRoutes = ({ children }: { children: JSX.Element }) => {
  const { cartItems } = useContext(CartContext)!;

  return cartItems.length ? <div>{children}</div> : <Navigate to="/orders" />;
};

export default ProtectedSuccessRoutes;
