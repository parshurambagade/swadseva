import React, { useEffect, useState } from "react";
import {
  StarIcon,
  MapPinIcon,
  ClockIcon,
  MinusIcon,
  PlusIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react";
import axios from "axios";
import { SWIGGY_IMAGES_URL, SWIGGY_RESTAURANT_URL } from "../constants";
import { useParams } from "react-router-dom";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  isVeg: boolean;
  image: string;
}

interface MenuCategory {
  category: string;
  items: MenuItem[];
}

const resImg =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/zsws4cdkzx90k3mlwozb";

const itemImg =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/ialkjssjppu71wicdnlf";

const restaurantData = {
  name: "Gourmet Delight",
  image: resImg,
  rating: 4.5,
  queasiness: "Fast",
  address: "123 Foodie Street, Culinary City",
  distance: "2.5 km",
  menu: [
    {
      category: "Appetizers",
      items: [
        {
          id: 1,
          name: "Bruschetta",
          description: "Toasted bread with fresh tomatoes and basil",
          price: 8.99,
          isVeg: true,
          image: itemImg,
        },
        {
          id: 2,
          name: "Chicken Wings",
          description: "Crispy wings with spicy sauce",
          price: 10.99,
          isVeg: false,
          image: itemImg,
        },
      ],
    },
    {
      category: "Main Course",
      items: [
        {
          id: 3,
          name: "Margherita Pizza",
          description: "Classic pizza with tomato and mozzarella",
          price: 14.99,
          isVeg: true,
          image: itemImg,
        },
        {
          id: 4,
          name: "Grilled Salmon",
          description: "Fresh salmon with lemon butter sauce",
          price: 18.99,
          isVeg: false,
          image: itemImg,
        },
      ],
    },
    {
      category: "Desserts",
      items: [
        {
          id: 5,
          name: "Tiramisu",
          description: "Italian coffee-flavored dessert",
          price: 7.99,
          isVeg: true,
          image: itemImg,
        },
        {
          id: 6,
          name: "Chocolate Lava Cake",
          description: "Warm chocolate cake with a gooey center",
          price: 8.99,
          isVeg: true,
          image: itemImg,
        },
      ],
    },
  ] as MenuCategory[],
};

export default function RestaurantPage() {
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [resInfo, setResInfo] = useState({} as any);
  const [menuItems, setMenuItems] = useState([] as any);

  const { resId } = useParams();

  useEffect(() => {
    if (resId) fetchResInfo();
  }, []);

  useEffect(() => {
    if (resInfo) console.log(resInfo);
  }, [resInfo]);

  const fetchResInfo = async () => {
    const { data } = await axios.get(SWIGGY_RESTAURANT_URL + resId);
    setMenuItems(
      data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (res) =>
          res?.card?.card?.title && res?.card?.card?.itemCards?.length > 0
      )
    );
    console.log(
      data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (res) =>
          res?.card?.card?.title && res?.card?.card?.itemCards?.length > 0
      )
    );

    setResInfo(data?.data?.cards[2]?.card?.card?.info);
  };

  const updateCart = (itemId: number, change: number) => {
    setCart((prevCart) => {
      const newQuantity = (prevCart[itemId] || 0) + change;
      if (newQuantity <= 0) {
        const { [itemId]: _, ...rest } = prevCart;
        return rest;
      }
      return { ...prevCart, [itemId]: newQuantity };
    });
  };

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  if (!resInfo) return null;

  const {
    name,
    city,
    avgRating,
    costForTwoMessage,
    cuisines,
    locality,
    sla,
    cloudinaryImageId,
  } = resInfo;
  return (
    <div className="container mx-auto min-h-[calc(100vh-64px)] max-w-4xl px-4 py-8">
      {/* Restaurant Info Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center mb-4">
          <img
            src={SWIGGY_IMAGES_URL + cloudinaryImageId}
            alt={name}
            className="w-full md:w-1/3 h-48 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
          />
          <div>
            <h2 className="text-3xl font-bold mb-2 text-gray-800">{name}</h2>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center">
                <StarIcon className="w-5 h-5 text-yellow-500 mr-1" />
                <span>{avgRating} Rating</span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="w-5 h-5 text-gray-500 mr-1" />
                <span>{cuisines?.join(", ")}</span>
              </div>
              <div className="flex items-center">
                <MapPinIcon className="w-5 h-5 text-gray-500 mr-1" />
                <span>{locality}</span>
              </div>
              <div className="flex items-center">
                <MapPinIcon className="w-5 h-5 text-gray-500 mr-1" />
                <span>{sla?.lastMileTravelString}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Menu</h3>
        {menuItems?.map((category, index) => (
          <div key={index} className="mb-4">
            <button
              className="w-full text-left p-4 bg-gray-100 rounded-lg flex justify-between items-center"
              onClick={() => toggleCategory(category?.card?.card?.title)}
            >
              <span className="font-semibold text-lg">
                {category?.card?.card?.title}
              </span>
              {openCategories.includes(category?.card?.card?.title) ? (
                <ChevronUpIcon className="w-5 h-5" />
              ) : (
                <ChevronDownIcon className="w-5 h-5" />
              )}
            </button>
            {openCategories.includes(category?.card?.card?.title) && (
              <div className="mt-4 space-y-4">
                {category?.card?.card?.itemCards?.map((item) => (
                  <div
                    key={item?.card?.info?.id}
                    className="border rounded-lg p-4 flex flex-col sm:flex-row items-center sm:items-start"
                  >
                    <img
                      src={SWIGGY_IMAGES_URL + item?.card?.info?.imageId}
                      alt={item?.card?.info?.name}
                      className="w-full sm:w-40 object-fill md:w-36 md:h-36 h-40 rounded-md mb-4 sm:mb-0 sm:mr-4"
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {item?.card?.info?.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {item?.card?.info?.description}
                          </p>
                        </div>
                        <span
                          className={`text-xs ${
                            item?.card?.info?.itemAttribute?.vegClassifier ===
                            "VEG"
                              ? "text-green-600"
                              : "text-red-600"
                          } ml-2`}
                        >
                          {item?.card?.info?.itemAttribute?.vegClassifier ===
                          "VEG"
                            ? "Veg"
                            : "Non-veg"}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2">
                        <span className="font-bold text-orange-500 mb-2 sm:mb-0">
                          ₹{item?.card?.info?.price / 100}
                        </span>
                        <div className="flex sm:flex-col gap-4 justify-center items-center space-x-2">
                          <div className="flex items-center bg-gray-100 rounded-full">
                            <button
                              className="p-2  rounded-full hover:bg-gray-200 transition-colors duration-200"
                              onClick={() =>
                                updateCart(item?.card?.info?.id, -1)
                              }
                              disabled={!cart[item?.card?.info?.id]}
                            >
                              <MinusIcon className="h-4 w-4 text-gray-600" />
                            </button>
                            <span className="mx-2 w-8 text-center">
                              {cart[item?.card?.info?.id] || 0}
                            </span>
                            <button
                              className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
                              onClick={() =>
                                updateCart(item?.card?.info?.id, 1)
                              }
                            >
                              <PlusIcon className="h-4 w-4 text-gray-600" />
                            </button>
                          </div>
                          <button
                            className="px-3 py-1 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors duration-200"
                            onClick={() => updateCart(item?.card?.info?.id, 1)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
