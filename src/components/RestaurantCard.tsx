import { ClockIcon, MapPinIcon, StarIcon } from "lucide-react";
import { SWIGGY_IMAGES_URL } from "../constants";

const RestaurantCard = ({restaurant}) => {

  return (
    <div
      className="max-w-sm  sm:w-full  bg-white cursor-pointer rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
    >
      <img
        src={SWIGGY_IMAGES_URL + restaurant?.info?.cloudinaryImageId}
        alt={restaurant?.info?.name}
        className="w-full h-56 object-fit"
      />
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2 text-gray-800">
          {restaurant?.info?.name}
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <div className="flex items-center">
            <ClockIcon className="h-5 w-5 mr-1 text-orange-500" />
            <span>{restaurant?.info?.sla?.slaString}</span>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="h-5 w-5 mr-1 text-orange-500" />
            <span>{restaurant?.info?.sla?.lastMileTravelString}</span>
          </div>
        </div>
        <div className="flex items-center text-orange-500">
          <StarIcon className="h-5 w-5 fill-current" />
          <span className="ml-1 font-semibold">{restaurant?.info?.avgRating}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard