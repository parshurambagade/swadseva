import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { CORS_PROXY_ORIGIN, SWIGGY_RESTAURANT_URL } from "../constants";
import { Link, useParams } from "react-router-dom";
import { FoodMenu, Info } from "../types";
import CartContext from "../contexts/CartContext";
import RestaurantInfoCard from "../components/RestaurantInfoCard";
import MenuContainer from "../components/MenuContainer";
import RestaurantInfoCardShimmer from "../components/ShimmerUI/RestaurantInfoCardShimmer";
import MenuContainerShimmer from "../components/ShimmerUI/MenuContainerShimmer";
import toast, { Toaster } from "react-hot-toast";
import ResContext from "../contexts/ResContext";

export default function RestaurantPage() {
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [resInfo, setResInfo] = useState<Info>({} as Info);
  const [menuItems, setMenuItems] = useState<FoodMenu[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [Error, setError] = useState<string>("");

  const { cartItems, addItem, removeItem, totalItems } =
    useContext(CartContext)!;

  const { location } = useContext(ResContext)!;

  const { resId } = useParams();

  useEffect(() => {
    toast.dismiss();
    const timer = setTimeout(() => {
      if (isLoading && !resInfo.name) {
        toast.loading(
          "Data is being fetched. This may take a moment due to our CORS proxy."
        );
      } else if (Error) {
        toast.error(Error);
      } else {
        toast.dismiss();
      }
    }, 1000);

    return () => {
      toast.dismiss();
      clearTimeout(timer);
    };
  }, [isLoading, Error, resInfo]);

  const fetchResInfo = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");
      if (!location?.latitude || !location?.longitude) {
        return;
      }
      const response = await axios.get(
        `${CORS_PROXY_ORIGIN}${encodeURIComponent(
          `${SWIGGY_RESTAURANT_URL + resId}&lat=${location?.latitude}&lng=${
            location?.longitude
          }`
        )}`
      );

      const { data } = JSON.parse(response.data.contents);

      setResInfo(data?.cards[2]?.card?.card?.info);

      setMenuItems(
        data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
          (res: FoodMenu) =>
            res?.card?.card?.title && res?.card?.card?.itemCards?.length > 0
        )
      );
    } catch (err) {
      console.error(err);
      setError("Error While Fetching Data. Please Try Again Later");
    } finally {
      setIsLoading(false);
    }
  }, [location, resId]);

  useEffect(() => {
    if (resId) fetchResInfo();
  }, [resId, fetchResInfo, location]);

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="container mx-auto min-h-[calc(100vh-64px)] max-w-4xl px-4 py-8">
      {/* Error Message */}
      {Error ? (
        <p className="text-red-500">{Error}</p>
      ) : isLoading ? (
        <RestaurantInfoCardShimmer />
      ) : (
        <RestaurantInfoCard resInfo={resInfo} />
      )}

      {/* Menu Section */}

      {isLoading ? (
        <MenuContainerShimmer />
      ) : (
        menuItems &&
        menuItems.length > 0 && (
          <MenuContainer
            menuItems={menuItems}
            toggleCategory={toggleCategory}
            openCategories={openCategories}
            removeItem={removeItem}
            cartItems={cartItems}
            addItem={addItem}
            resInfo={resInfo}
          />
        )
      )}

      <div
        className={`cursor-pointer fixed bottom-10 sm:bottom-20 right-10 sm:right-20  rounded-full overflow-hidden flex items-center justify-center text-center shadow-xl bg-gray-200 p-3 z-50 text-gray-600 ${
          cartItems.length > 0
            ? " animate-bounce duration-300 transition-all "
            : ""
        }`}
      >
        <p
          className={`text-[8px] absolute top-2 text-white right-3 bg-orange-600 rounded-full w-3 h-3  ${
            cartItems.length <= 0 ? " hidden " : ""
          }`}
        >
          {totalItems}
        </p>
        <Link to="/cart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-shopping-cart"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
        </Link>
      </div>
      {!Object.values(resInfo).length && <Toaster />}
    </div>
  );
}
