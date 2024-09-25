import React from "react";

const RestaurantInfoCardShimmer: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 animate-pulse">
      <div className="flex flex-col md:flex-row md:items-center mb-4">
        <div className="flex justify-center items-center w-full md:w-1/3 h-48 bg-gray-300 rounded-lg mb-4 md:mb-0 md:mr-6 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
        </div>
        <div className="flex-1">
          <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="flex flex-wrap gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-gray-300 mr-2"></div>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfoCardShimmer;