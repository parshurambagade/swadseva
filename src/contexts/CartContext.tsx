import { createContext, useState } from "react";
import { CartContextType, CartItem } from "../types";
import toast from "react-hot-toast";

const CartContext = createContext<CartContextType | null>({
  cartItems: [],
  setCartItems: () => {},
  totalItems: 0,
  setTotalItems: () => {},
  totalAmount: 0,
  setTotalAmount: () => {},
  addItem: () => {},
  removeItem: () => {},
  clearItem: () => {},
  clearCart: () => {},
});

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const addItem = (item: CartItem) => {
    const existingItem = cartItems.find((i) => i.id === item.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      );
      setTotalItems(totalItems + item.quantity);
      setTotalAmount((prev) => prev + existingItem.price);
    } else {
      setCartItems([...cartItems, item]);
      setTotalItems(totalItems + item.quantity);
      setTotalAmount((prev) => prev + item.price);
    }
  };

  const removeItem = (id: number) => {
    const existingItem = cartItems.find((i) => i.id == id);
    if (existingItem) {
      if (existingItem.quantity > 1) {
        setCartItems(
          cartItems.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity - 1 } : i
          )
        );
        setTotalItems(totalItems - 1);
        setTotalAmount((prev) => prev - existingItem.price);
      } else {
        // If quantity is 1, remove the item completely
        setCartItems(cartItems.filter((i) => i.id !== id));
        setTotalItems(totalItems - 1);
        setTotalAmount((prev) => prev - existingItem.price);
      }
    }
  };

  const clearItem = (id: number) => {
    const existingItem = cartItems.find((i) => i.id === id);
    if (existingItem) {
      setCartItems(cartItems.filter((i) => i.id !== id));
      setTotalItems(totalItems - existingItem.quantity);
      setTotalAmount(totalAmount - existingItem.price * existingItem.quantity);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setTotalItems(0);
    setTotalAmount(0);
    toast.error(`Cart emptied!`);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        totalItems,
        setTotalItems,
        totalAmount,
        setTotalAmount,
        addItem,
        removeItem,
        clearItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
