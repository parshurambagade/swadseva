import { useContext, useState } from "react";
import { SearchIcon } from "lucide-react";
import RestaurantCard from "../components/RestaurantCard";
import ResContext from "../contexts/ResContext";
import RestaurantCardShimmer from "../components/ShimmerUI/RestaurantCardShimmer";
import Toast from "../components/Toast";

export default function HomePage() {
  const { setSortBy, filteredResList, setSearchTerm, isLoading, Error, showToast, setShowToast } =
    useContext(ResContext)!;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  // if (!filteredResList) return;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Search and Sort Section */}
        <HomeHeader handleSearch={handleSearch} handleSort={handleSort} />

        {/* Error Message */}
        {Error ? (
          <p className="text-red-500">{Error}</p>
        ) : (
          <section className="mb-12">
            {/* Top Restaurants Section */}
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Top Restaurants
            </h2>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-between">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i: number) => (
                  <RestaurantCardShimmer key={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredResList?.map((restaurant) => (
                  <RestaurantCard
                    restaurant={restaurant}
                    key={restaurant?.info?.id}
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      {showToast && (
      <Toast message="Data is being fetched. This may take a moment due to our CORS proxy." onClose={() => setShowToast(false)} />
      )}
    </div>
  );
}

const HomeHeader = ({
  handleSearch,
  handleSort,
}: {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSort: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  const { searchTerm, sortBy } = useContext(ResContext)!;

  return (
    <div className="mb-8 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
      <div className="relative w-full sm:w-96">
        <input
          type="text"
          placeholder="Search restaurants..."
          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={searchTerm}
          onChange={handleSearch}
        />
        <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      <select
        className="w-full sm:w-auto px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        value={sortBy}
        onChange={handleSort}
      >
        <option value="rating">Sort by Rating</option>
        <option value="deliveryTime">Sort by Delivery Time</option>
      </select>
    </div>
  );
};
