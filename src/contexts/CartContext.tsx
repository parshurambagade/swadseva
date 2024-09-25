import { createContext, useState } from "react";
import { CartItem } from "../types";


interface CartContextType {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  totalItems: number;
  setTotalItems: React.Dispatch<React.SetStateAction<number>>;
  totalAmount: number;
  setTotalAmount: React.Dispatch<React.SetStateAction<number>>;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearItem: (id: number) => void;
  clearCart: () => void;
}

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
    console.log("Adding item to the cart!");
    const existingItem = cartItems.find(i => i.id === item.id);
    if (existingItem) {
      setCartItems(
        cartItems.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
      );
    } else {
      setCartItems([...cartItems, item]);
    }
    setTotalItems(totalItems + item.quantity);
    setTotalAmount(totalAmount + item.price * item.quantity);
  };

  const removeItem = (id: number) => {
    console.log("Removing item to the cart!");
    const existingItem = cartItems.find(i => i.id === id);
    if (existingItem && existingItem.quantity > 1) {
      setCartItems(cartItems.map(i => i.id === id ? {...i, quantity: i.quantity - 1} : i));
      setTotalItems(totalItems - 1);
      setTotalAmount(totalAmount - existingItem.price);
    }
  };

  const clearItem = (id: number) => {
    const existingItem = cartItems.find(i => i.id === id);
    if (existingItem) {
      setCartItems(cartItems.filter(i => i.id !== id));
    setTotalItems(totalItems - existingItem.quantity);
    setTotalAmount(totalAmount - existingItem.price * existingItem.quantity);
    }
  }

  const clearCart = () => {
    setCartItems([]);
    setTotalItems(0);
    setTotalAmount(0);
  }

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
