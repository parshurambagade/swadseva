import { useContext, useEffect, useState } from "react";
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
import { SWIGGY_IMAGES_URL} from "../constants";
import { useParams } from "react-router-dom";
import { FoodMenu, Info, ItemCard } from "../types";
import CartContext from "../contexts/CartContext";

export default function RestaurantPage() {
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [resInfo, setResInfo] = useState<Info>({} as Info);
  const [menuItems, setMenuItems] = useState<FoodMenu[]>([]);

  const { cartItems, addItem, removeItem} =
    useContext(CartContext)!;

  const { resId } = useParams();

  useEffect(() => {
    if (resId) fetchResInfo();
  }, []);

  useEffect(() => {
    if (resInfo) console.log(resInfo);
  }, [resInfo]);

  const fetchResInfo = async () => {
    try{
    const { data } = await axios.get(
      `https://api.allorigins.win/get?url=${encodeURIComponent('https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=18.5204303&lng=73.8567437&restaurantId=13909')}`
    );

    setMenuItems(
      data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (res: FoodMenu) =>
          res?.card?.card?.title && res?.card?.card?.itemCards?.length > 0
      )
    );
    console.log(
      data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (res: FoodMenu) =>
          res?.card?.card?.title && res?.card?.card?.itemCards?.length > 0
      )
    );

    setResInfo(data?.data?.cards[2]?.card?.card?.info);
  }catch(err){
      console.error(err);
    }
  };

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  if (!resInfo) return null;

  const { name, avgRating, locality, sla, cloudinaryImageId } = resInfo;
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
                <span>{sla?.slaString}</span>
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
        {menuItems?.map((category: FoodMenu, index) => (
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
                {category?.card?.card?.itemCards?.map((item: ItemCard) => (
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
                          ₹{item?.card?.info?.price/100 || Number(item?.card?.info?.defaultPrice)/100}
                        </span>
                        <div className="flex sm:flex-col gap-4 justify-center items-center space-x-2">
                          <div className="flex items-center bg-gray-100 rounded-full">
                            <button
                              className="p-2  rounded-full hover:bg-gray-200 transition-colors duration-200"
                              onClick={() =>
                                removeItem(Number(item?.card?.info?.id))
                              }
                              disabled={
                                !cartItems[Number(item?.card?.info?.id)]
                              }
                            >
                              <MinusIcon className="h-4 w-4 text-gray-600" />
                            </button>
                            <span className="mx-2 w-8 text-center">
                              {cartItems.find(i => Number(i.id) === Number(item?.card?.info?.id))?.quantity || 0}
                            </span>
                            <button
                              className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
                              onClick={() =>
                                addItem({id: Number(item?.card?.info?.id), quantity: 1, price: item?.card?.info?.price/100 || Number(item?.card?.info?.defaultPrice)/100, name: item?.card?.info?.name, image: item?.card?.info?.imageId, restaurant: resInfo.name})
                              }
                            >
                              <PlusIcon className="h-4 w-4 text-gray-600" />
                            </button>
                          </div>
                          <button
                            className="px-3 py-1 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors duration-200"
                            onClick={() =>
                              addItem({id: Number(item?.card?.info?.id), quantity: 1, price: item?.card?.info?.price/100 || Number(item?.card?.info?.defaultPrice) / 100, name: item?.card?.info?.name, image: item?.card?.info?.imageId, restaurant: resInfo.name})
                            }
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
