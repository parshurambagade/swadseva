const RestaurantCardShimmer = () => {
  return (
    <div className="max-w-sm  sm:w-full  bg-white cursor-pointer rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 animate-pulse">
      <div className="bg-gray-300  rounded-t-lg p-2 flex justify-center items-center h-60 text-gray-400">
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
          className="lucide lucide-image"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
      </div>
      <div className="p-4">
        <div className="mb-4 flex flex-col">
          <div className="font-bold text-xl mb-1  text-gray-800 bg-gray-200 w-full h-6 rounded-md"></div>

          <div className="text-sm my-1 text-gray-600 h-3 w-3/4 bg-gray-200 rounded-md"></div>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <div className="flex items-center">
            <div className="h-5 w-5 mr-1 bg-gray-200 rounded-full" />
            <div className="bg-gray-200 h-3 w-20 rounded-md"></div>
          </div>
          <div className="flex items-center">
            <div className="h-5 w-5 mr-1 bg-gray-200 rounded-full" />
            <div className="bg-gray-200 h-3 w-12 rounded-md"></div>
          </div>
        </div>
        <div className="flex items-center text-orange-500">
          <div className="h-5 w-5 mr-1 bg-gray-200 rounded-full" />
          <div className="bg-gray-200 h-3 w-8 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCardShimmer;
