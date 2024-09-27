import { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { CORS_PROXY_ORIGIN, SWIGGY_API_URL } from "../constants";
import { ResContextType, RestaurantCardType } from "../types";

const ResContext = createContext<ResContextType | null>(null);

const ResContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [resList, setResList] = useState<RestaurantCardType[]>([]);
  const [filteredResList, setFilteredResList] = useState<RestaurantCardType[]>(
    []
  );
  const [sortedResList, setSortedResList] = useState<RestaurantCardType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [Error, setError] = useState<string>("");
  const [showToast, setShowToast] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const fetchRestaurants = useCallback(async (location: {latitude: number, longitude: number}) => {
    try {
      setError("");
      setIsLoading(true);
      setShowToast(true);

      if(!location.latitude || !location.longitude){
       return;
      }
      
      const response = await axios.get(`${CORS_PROXY_ORIGIN}${encodeURIComponent(SWIGGY_API_URL + "&lat=" + location.latitude + "&lng=" + location.longitude)}`);
      const parsedData = JSON.parse(response?.data?.contents);
      const restaurants =
        parsedData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;
      setResList(restaurants);
      setTitle(parsedData?.data?.cards[1]?.card?.card?.header?.title);
    } catch (err) {
      console.error(err);
      setError("Error While Fetching Data. Please Try Again Later");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          // setError(error?.message);
          setLocation({
            latitude: 18.5204,
            longitude: 73.8567,
          })
          console.error(error?.message);
        }
      );
    }else{
      setError("Geolocation is not supported by this browser.");
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if(location){
      fetchRestaurants(location);
    }
  }, [fetchRestaurants, location]);

  useEffect(() => {
    if (resList) {
      const sortedData = [...resList].sort((a, b) => {
        if (sortBy === "rating") return b?.info?.avgRating - a?.info?.avgRating;
        if (sortBy === "deliveryTime")
          return (
            Number(a?.info?.sla?.deliveryTime) -
            Number(b?.info?.sla?.deliveryTime)
          );
        return 0;
      });

      const filteredData = sortedData.filter((restaurant) =>
        restaurant?.info?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredResList(filteredData);
    }
  }, [sortBy, searchTerm, resList]);

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
        isLoading,
        Error,
        showToast,
        setShowToast,
        title,
        location
      }}
    >
      {children}
    </ResContext.Provider>
  );
};
export { ResContextProvider };
export default ResContext;
