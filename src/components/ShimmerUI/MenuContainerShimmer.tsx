import React from "react";

const MenuContainerShimmer: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
      {[1, 2, 3].map((category) => (
        <div key={category} className="mb-4">
          <div className="w-full h-14 bg-gray-100 rounded-lg flex justify-between items-center p-4 mb-4">
            <div className="h-6 bg-gray-300 rounded w-1/3"></div>
            <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
          </div>
          {category === 1 && (
            <div className="mt-4 space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex flex-col sm:flex-row items-center sm:items-start border rounded-lg p-4">
                  <div className="w-full sm:w-40 h-40 bg-gray-300 rounded-md mb-4 sm:mb-0 sm:mr-4"></div>
                  <div className="flex-grow">
                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-6 bg-gray-300 rounded w-20"></div>
                      <div className="h-10 bg-gray-300 rounded w-28"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuContainerShimmer;