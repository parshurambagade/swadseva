import { useContext, useState } from "react";
import { SearchIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Toaster } from "react-hot-toast";
import OrdersContext from "../contexts/OrdersContext";

// const initialOrders: Order[] = [
//   { id: 1, itemName: "Margherita Pizza", restaurantName: "Pizza Palace", price: 12.99, quantity: 2, total: 25.98, orderDate: "2023-06-15" },
//   { id: 2, itemName: "Chicken Burger", restaurantName: "Burger Barn", price: 8.99, quantity: 1, total: 8.99, orderDate: "2023-06-14" },
//   { id: 3, itemName: "Vegetable Stir Fry", restaurantName: "Asian Fusion", price: 10.99, quantity: 1, total: 10.99, orderDate: "2023-06-13" },
//   { id: 4, itemName: "Chocolate Cake", restaurantName: "Sweet Treats", price: 6.99, quantity: 2, total: 13.98, orderDate: "2023-06-12" },
// ];

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<"date" | "price">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const { orders, setOrders } = useContext(OrdersContext)!;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filteredOrders = orders.filter(
      (order) =>
        order.itemName.toLowerCase().includes(term.toLowerCase()) ||
        order.restaurantName.toLowerCase().includes(term.toLowerCase())
    );
    setOrders(filteredOrders);
  };

  const handleSort = (criteria: "date" | "price") => {
    if (criteria === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(criteria);
      setSortOrder("asc");
    }

    const sortedOrders = [...orders].sort((a, b) => {
      if (criteria === "price") {
        return sortOrder === "asc" ? a.total - b.total : b.total - a.total;
      } else if (criteria === "date") {
        return sortOrder === "asc"
          ? new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()
          : new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
      }
      return 0;
    });

    setOrders(sortedOrders);
  };

  return (
    <div className="container mx-auto min-h-[calc(100vh-64px)] max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Order History</h1>

      {/* Search and Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <div className="w-full sm:w-64 relative">
          <input
            type="text"
            placeholder="Search by item or restaurant"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value as "date" | "price")}
            className="px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="price">Price</option>
            <option value="date">Date</option>
          </select>
          <button
            onClick={() => handleSort(sortBy)}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
          >
            {sortOrder === "asc" ? (
              <ChevronUpIcon className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Order Cards */}
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div className="mb-4 sm:mb-0">
                <h3 className="font-semibold text-lg text-gray-800">
                  {order.itemName}
                </h3>
                <p className="text-gray-600">{order.restaurantName}</p>
              </div>
              <div className="flex flex-col items-start sm:items-end">
                <p className="text-gray-600">Quantity: {order.quantity}</p>
                <p className="text-gray-600">
                  Price: ₹{order.price.toFixed(2)}
                </p>
                <p className="font-semibold text-orange-500">
                  Total: ₹{order.total.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  Order Date: {order.orderDate}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Toaster />
    </div>
  );
}
