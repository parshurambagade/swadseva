import React, { useEffect, useState } from "react";
import {
  SearchIcon,
} from "lucide-react";
import RestaurantCard from "../components/RestaurantCard";
import axios from "axios";
import { SWIGGY_API_URL } from "../constants";

const imageUrl =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2024/6/4/3c2c022a-d0ea-4f0a-aec5-52546292aa0a_5624.JPG";
const restaurants = [
  {
    id: 1,
    name: "Tasty Bites",
    rating: 4.5,
    image: imageUrl,
    deliveryTime: "25-35",
    distance: "1.8",
  },
  {
    id: 2,
    name: "Spice Haven",
    rating: 4.7,
    image: imageUrl,
    deliveryTime: "30-40",
    distance: "2.2",
  },
  {
    id: 3,
    name: "Green Leaf Cafe",
    rating: 4.3,
    image: imageUrl,
    deliveryTime: "20-30",
    distance: "1.5",
  },
  {
    id: 4,
    name: "Burger Palace",
    rating: 4.6,
    image: imageUrl,
    deliveryTime: "25-35",
    distance: "2.0",
  },
  {
    id: 5,
    name: "Sushi Express",
    rating: 4.8,
    image: imageUrl,
    deliveryTime: "35-45",
    distance: "2.7",
  },
  {
    id: 6,
    name: "Pizza Paradise",
    rating: 4.4,
    image: imageUrl,
    deliveryTime: "30-40",
    distance: "2.3",
  },
];



export default function HomePage() {

  const [restaurants, setRestaurants] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const sortedRestaurants = restaurants.sort((a, b) => {
    if (sortBy === "rating") return b?.info?.avgRating - a?.info?.avgRating;
    if (sortBy === "deliveryTime")
      return parseInt(a?.sla?.deliveryTime) - parseInt(b?.sla?.deliveryTime);
    return 0;
  });

  const filteredRestaurants = sortedRestaurants.filter((restaurant) =>
    restaurant?.info?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  useEffect(() => {
    fetchRestaurants();
  }, [])


  const fetchRestaurants = async () => {
    const response = await axios.get(SWIGGY_API_URL);
    setRestaurants(response?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  };

  if(!restaurants) return;
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Search and Sort Section */}
        <HomeHeader searchTerm={searchTerm} sortBy={sortBy} handleSearch={handleSearch} handleSort={handleSort}/>

        {/* Top Restaurants Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Top Restaurants
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
            {filteredRestaurants?.map((restaurant) => (
              <RestaurantCard restaurant={restaurant} key={restaurant?.id} />
            ))}
          </div>
        </section>

    
      </main>

    </div>
  );
}


const HomeHeader = ({searchTerm, sortBy, handleSearch, handleSort}) => {
  return (<div className="mb-8 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
    <div className="relative w-full sm:w-96">
      <input
        type="text"
        placeholder="Search restaurants..."
        className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        value={searchTerm}
        onChange={handleSearch}
      />
      <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
    </div>
    <select
      className="w-full sm:w-auto px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
      value={sortBy}
      onChange={handleSort}
    >
      <option value="rating">Sort by Rating</option>
      <option value="deliveryTime">Sort by Delivery Time</option>
    </select>
  </div>)
}