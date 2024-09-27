import { useContext } from "react";
import {
  MinusIcon,
  PlusIcon,
  Trash2Icon,
  ShoppingCartIcon,
} from "lucide-react";
import CartContext from "../contexts/CartContext";
import { SWIGGY_IMAGES_URL } from "../constants";
import toast, { Toaster } from "react-hot-toast";
import { CartItem, OrderItem } from "../types";
import { useNavigate } from "react-router-dom";
import OrdersContext from "../contexts/OrdersContext";

export default function CartPage() {
  const { cartItems, clearCart, totalAmount, clearItem, addItem, removeItem } =
    useContext(CartContext)!;

  const { setOrders } = useContext(OrdersContext)!;

  const navigate = useNavigate();

  const notify = (item: CartItem) =>
    toast.error(`Removed ${item?.name} from cart!`, {
      duration: 3000,
      position: "top-center",
    });

  const handleClearItem = (item: CartItem) => {
    clearItem(item.id);
    notify(item);
  };

  const handlePlusClick = (item: CartItem) => {
    addItem({
      id: Number(item.id),
      quantity: 1,
      price: item.price / 100,
      name: item?.name,
      image: item?.image,
      restaurant: item?.restaurant,
    });
  };

  const handleCheckout = () => {
    const orderItems: OrderItem[] = cartItems.map((item) => {
      return {
        id: item.id,
        itemName: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        restaurantName: item.restaurant,
        total: item.price * item.quantity,
        orderDate: new Date().toLocaleDateString(),
      };
    });
  
    // Filter out any items with quantity 0
    const validOrderItems = orderItems.filter(item => item.quantity > 0);
  
    setOrders((prev) => [...prev, ...validOrderItems]);
    navigate("/success");
  };

  return (
    <div className="container mx-auto max-w-4xl min-h-[calc(100vh-64px)] px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h2>

      {/* Card Container */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between border-b py-4 last:border-b-0"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4 mb-4 sm:mb-0">
                <img
                  src={SWIGGY_IMAGES_URL + item.image}
                  alt={item.name}
                  className="w-full md:w-24 lg:w-20 md:h-24 lg:h-20 object-cover rounded mb-2 sm:mb-0"
                />
                <div className="text-center sm:text-left">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-500">{item.restaurant}</p>
                  <p className="font-bold text-orange-500">
                    ₹{Number(item.price)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
                  onClick={() => removeItem(item.id)}
                >
                  <MinusIcon className="h-4 w-4 text-gray-600" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
                  onClick={() => handlePlusClick(item)}
                >
                  <PlusIcon className="h-4 w-4 text-gray-600" />
                </button>
                <button
                  className="p-1 rounded-full bg-red-100 hover:bg-red-200 transition-colors duration-200"
                  onClick={() => handleClearItem(item)}
                >
                  <Trash2Icon className="h-4 w-4 text-red-500" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Total Amount */}
      <div className="text-right mb-6">
        <p className="text-xl font-bold text-gray-800">
          Total: <span className="text-orange-500">₹{totalAmount.toFixed(2)}</span>
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
        <button
          className="w-full sm:w-auto px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors duration-200"
          onClick={clearCart} disabled={!cartItems.length}
        >
          Clear Cart
        </button>
        <button
          disabled={cartItems.length === 0}
          onClick={handleCheckout}
          className="w-full sm:w-auto px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center cursor-pointer"
        >
          <ShoppingCartIcon className="mr-2 h-5 w-5" /> Checkout
        </button>
      </div>
      <Toaster />
    </div>
  );
}
