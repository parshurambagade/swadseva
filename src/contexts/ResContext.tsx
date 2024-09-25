import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { CORS_PROXY_ORIGIN, SWIGGY_API_URL } from "../constants";
import { RestaurantCardType } from "../types";

// interface RestaurantType {
//   id: string;
//   name: string;
//   rating: number;
//   image: string;
//   deliveryTime: string;
//   distance: string;
// }
interface ResContextType {
  resList: RestaurantCardType[];
  setResList: React.Dispatch<React.SetStateAction<RestaurantCardType[]>>;
  filteredResList: RestaurantCardType[];
  setFilteredResList: React.Dispatch<React.SetStateAction<RestaurantCardType[]>>;
  sortedResList: RestaurantCardType[];
  setSortedResList: React.Dispatch<React.SetStateAction<RestaurantCardType[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;  
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
}

const ResContext = createContext<ResContextType | null>(null);

const ResContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [resList, setResList] = useState<RestaurantCardType[]>([]);
  const [filteredResList, setFilteredResList] = useState<RestaurantCardType[]>([]);
  const [sortedResList, setSortedResList] = useState<RestaurantCardType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {

    if (resList) {
      const sortedData = resList.sort((a: RestaurantCardType, b: RestaurantCardType) => {
        if (sortBy === "rating") return b?.info?.avgRating - a?.info?.avgRating;
        if (sortBy === "deliveryTime")
          return (
            parseInt(a?.info?.sla?.lastMileTravelString) -
            parseInt(b?.info?.sla?.lastMileTravelString)
          );
        return 0;
      });

      setSortedResList(sortedData);
    }
  }, [sortBy, searchTerm, resList]);

  useEffect(() => {
    if (sortedResList) {
      const filteredData = sortedResList.filter((restaurant: RestaurantCardType ) =>
        restaurant?.info?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredResList(filteredData);
    }
  }, [searchTerm, sortBy, sortedResList]);

  const fetchRestaurants = async () => {
    try{
    const response = await axios.get(`${CORS_PROXY_ORIGIN}${encodeURIComponent(SWIGGY_API_URL)}`);
    setResList(
     await JSON.parse(response?.data?.contents)?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );}catch(err){
      console.error(err);
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <ResContext.Provider
      value={{
        resList,
        setResList,
        filteredResList,
        setFilteredResList,
        sortedResList,
        setSortedResList,
        searchTerm,
        setSearchTerm,
        sortBy,
        setSortBy,
        isLoading
      }}
    >
      {children}
    </ResContext.Provider>
  );
};
export { ResContextProvider};
export default ResContext;
