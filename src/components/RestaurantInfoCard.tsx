import React from "react";
import { SWIGGY_IMAGES_URL } from "../constants";
import { ClockIcon, MapPinIcon, StarIcon } from "lucide-react";
import { Info } from "../types";

const RestaurantInfoCard: React.FC<{ resInfo: Info }> = ({ resInfo }) => {
  const { name, avgRating, locality, sla, cloudinaryImageId } = resInfo;
  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center mb-4">
        {cloudinaryImageId && (
          <img
            src={SWIGGY_IMAGES_URL + cloudinaryImageId}
            alt={name}
            className="w-full md:w-1/3 h-48 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
          />
        )}
        <div>
          <h2 className="text-3xl font-bold mb-2 text-gray-800">{name}</h2>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center">
              <StarIcon className="w-5 h-5 text-gray-500 mr-1"/>
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
  );
};

export default RestaurantInfoCard;
