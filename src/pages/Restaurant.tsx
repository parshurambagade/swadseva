import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CORS_PROXY_ORIGIN, SWIGGY_RESTAURANT_URL } from "../constants";
import { useParams } from "react-router-dom";
import { FoodMenu, Info } from "../types";
import CartContext from "../contexts/CartContext";
import RestaurantInfoCard from "../components/RestaurantInfoCard";
import MenuContainer from "../components/MenuContainer";
import RestaurantInfoCardShimmer from "../components/ShimmerUI/RestaurantInfoCardShimmer";
import MenuContainerShimmer from "../components/ShimmerUI/MenuContainerShimmer";

export default function RestaurantPage() {
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [resInfo, setResInfo] = useState<Info>({} as Info);
  const [menuItems, setMenuItems] = useState<FoodMenu[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { cartItems, addItem, removeItem } = useContext(CartContext)!;

  const { resId } = useParams();

  useEffect(() => {
    const fetchResInfo = async () => {
      try {
        const response = await axios.get(
          `${CORS_PROXY_ORIGIN}${encodeURIComponent(
            `${SWIGGY_RESTAURANT_URL}${resId}`
          )}`
        );

        const { data } = await JSON.parse(response.data.contents);

        // console.log(response);

        setResInfo(data?.cards[2]?.card?.card?.info);

        setMenuItems(
          data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
            (res: FoodMenu) =>
              res?.card?.card?.title && res?.card?.card?.itemCards?.length > 0
          )
        );
      } catch (err) {
        console.error(err);
      }finally{
        setIsLoading(false);
      }
    };

    if (resId) fetchResInfo();

    return () => {
      setResInfo({} as Info);
      setMenuItems([]);
    };
  }, [resId, setResInfo, setMenuItems]);

  useEffect(() => {
    if (resInfo) console.log(resInfo);
  }, [resInfo]);

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="container mx-auto min-h-[calc(100vh-64px)] max-w-4xl px-4 py-8">
      {/* Restaurant Info Section */}
      {isLoading ? <RestaurantInfoCardShimmer /> : 
      <RestaurantInfoCard resInfo={resInfo} />}

      {/* Menu Section */}

      {isLoading ? <MenuContainerShimmer /> : menuItems && menuItems.length > 0 && (
        <MenuContainer
          menuItems={menuItems}
          toggleCategory={toggleCategory}
          openCategories={openCategories}
          removeItem={removeItem}
          cartItems={cartItems}
          addItem={addItem}
          resInfo={resInfo}
        />
      )}
    </div>
  );
}
