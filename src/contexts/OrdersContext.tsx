import { createContext, useState } from "react";
import { OrderItem, OrdersContextType } from "../types";

const OrdersContext = createContext<OrdersContextType | null>(null);

export const OrdersContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  return (
    <OrdersContext.Provider value={{ orders, setOrders }}>
      {children}
    </OrdersContext.Provider>
  );
};
export default OrdersContext;
