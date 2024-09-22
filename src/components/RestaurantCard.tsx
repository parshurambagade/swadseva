import { ClockIcon, MapPinIcon, StarIcon } from "lucide-react";

const RestaurantCard = ({restaurant}) => {
  return (
    <div
      className="bg-white cursor-pointer rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
    >
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2 text-gray-800">
          {restaurant.name}
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <div className="flex items-center">
            <ClockIcon className="h-5 w-5 mr-1 text-orange-500" />
            <span>{restaurant.deliveryTime} min</span>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="h-5 w-5 mr-1 text-orange-500" />
            <span>{restaurant.distance} km</span>
          </div>
        </div>
        <div className="flex items-center text-orange-500">
          <StarIcon className="h-5 w-5 fill-current" />
          <span className="ml-1 font-semibold">{restaurant.rating}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard