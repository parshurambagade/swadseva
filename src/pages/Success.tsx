import { useContext, useEffect, useState } from "react";
import { HashLoader, PropagateLoader } from "react-spinners";
import CartContext from "../contexts/CartContext";

const Success = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const { setCartItems, setTotalItems, setTotalAmount } =
    useContext(CartContext)!;
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    setTimeout(() => {
      setCartItems([]);
      setTotalItems(0);
      setTotalAmount(0);
    }, 7000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] text-center">
      {loading ? (
        <PropagateLoader color="#F97316" />
      ) : (
        <div className="text-center flex items-center justify-center flex-col">
          <HashLoader color="#F97316" />
          <h1 className="font-bold text-3xl my-4">Order Successful!</h1>
          <p className="text-gray-600">
            Your order has been placed successfully!
          </p>
        </div>
      )}
    </div>
  );
};

export default Success;
