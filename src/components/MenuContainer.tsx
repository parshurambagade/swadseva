import React from "react";
import { FoodMenu, ItemCard, MenuContainerType } from "../types";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import MenuItem from "./MenuItem";

const MenuContainer: React.FC<MenuContainerType> = ({
  menuItems,
  toggleCategory,
  openCategories,
  removeItem,
  cartItems,
  addItem,
  resInfo,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">Menu</h3>
      {menuItems?.map((category: FoodMenu, index) => (
        <div key={index} className="mb-4">
          <button
            className="w-full text-left p-4 bg-gray-100 rounded-lg flex justify-between items-center"
            onClick={() => toggleCategory(category?.card?.card?.title)}
          >
            <span className="font-semibold text-lg">
              {category?.card?.card?.title}
            </span>
            {openCategories.includes(category?.card?.card?.title) ? (
              <ChevronUpIcon className="w-5 h-5" />
            ) : (
              <ChevronDownIcon className="w-5 h-5" />
            )}
          </button>
          {openCategories.includes(category?.card?.card?.title) && (
            <div className="mt-4 space-y-4">
              {category?.card?.card?.itemCards?.map((item: ItemCard) => (
                <MenuItem
                  key={item?.card?.info?.id}
                  item={item}
                  cartItems={cartItems}
                  addItem={addItem}
                  removeItem={removeItem}
                  resInfo={resInfo}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuContainer;
