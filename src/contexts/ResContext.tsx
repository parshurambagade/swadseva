import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { SWIGGY_API_URL } from "../constants";

interface RestaurantType {
  id: string;
  name: string;
  rating: number;
  image: string;
  deliveryTime: string;
  distance: string;
}
interface ResContextType {
  resList: RestaurantType[];
  setResList: React.Dispatch<React.SetStateAction<RestaurantType[]>>;
  filteredResList: RestaurantType[];
  setFilteredResList: React.Dispatch<React.SetStateAction<RestaurantType[]>>;
  sortedResList: RestaurantType[];
  setSortedResList: React.Dispatch<React.SetStateAction<RestaurantType[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;  
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
}

const ResContext = createContext<ResContextType | null>(null);

const ResContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [resList, setResList] = useState<RestaurantType[]>([]);
  const [filteredResList, setFilteredResList] = useState<RestaurantType[]>([]);
  const [sortedResList, setSortedResList] = useState<RestaurantType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    console.log(resList);

    if (resList) {
      const sortedData = resList.sort((a, b) => {
        if (sortBy === "rating") return b?.info?.avgRating - a?.info?.avgRating;
        if (sortBy === "deliveryTime")
          return (
            parseInt(a?.info?.sla?.deliveryTime) -
            parseInt(b?.info?.sla?.deliveryTime)
          );
        return 0;
      });

      setSortedResList(sortedData);
    }
  }, [sortBy, searchTerm, resList]);

  useEffect(() => {
    if (sortedResList) {
      const filteredData = sortedResList.filter((restaurant) =>
        restaurant?.info?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredResList(filteredData);
    }
  }, [searchTerm, sortBy, sortedResList]);

  const fetchRestaurants = async () => {
    const response = await axios.get(SWIGGY_API_URL);
    setResList(
      response?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
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
      }}
    >
      {children}
    </ResContext.Provider>
  );
};
export { ResContextProvider};
export default ResContext;
