import { MinusIcon, PlusIcon } from 'lucide-react'
import React from 'react'
import { SWIGGY_IMAGES_URL } from '../constants'
import { CartItem, Info, ItemCard } from '../types'

const MenuItem:React.FC<{item: ItemCard, cartItems: CartItem[], addItem:(item:CartItem) => void, removeItem:(id:number) => void, resInfo: Info}> = ({item, cartItems, removeItem, addItem, resInfo}) => {

    return (<div
        key={item?.card?.info?.id}
        className="border rounded-lg p-4 flex flex-col sm:flex-row items-center sm:items-start"
      >
        <img
          src={SWIGGY_IMAGES_URL + item?.card?.info?.imageId}
          alt={item?.card?.info?.name}
          className="w-full sm:w-40 object-fill md:w-36 md:h-36 h-40 rounded-md mb-4 sm:mb-0 sm:mr-4"
        />
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-semibold text-gray-800">
                {item?.card?.info?.name}
              </h4>
              <p className="text-sm text-gray-600">
                {item?.card?.info?.description}
              </p>
            </div>
            <span
              className={`text-xs ${
                item?.card?.info?.itemAttribute?.vegClassifier ===
                "VEG"
                  ? "text-green-600"
                  : "text-red-600"
              } ml-2`}
            >
              {item?.card?.info?.itemAttribute?.vegClassifier ===
              "VEG"
                ? "Veg"
                : "Non-veg"}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2">
            <span className="font-bold text-orange-500 mb-2 sm:mb-0">
              ₹
              {item?.card?.info?.price / 100 ||
                Number(item?.card?.info?.defaultPrice) / 100}
            </span>
            <div className="flex sm:flex-col gap-4 justify-center items-center space-x-2">
              <div className="flex items-center bg-gray-100 rounded-full">
                <button
                  className="p-2  rounded-full hover:bg-gray-200 transition-colors duration-200"
                  onClick={() =>
                    removeItem(Number(item?.card?.info?.id))
                  }
                  disabled={
                    !cartItems[Number(item?.card?.info?.id)]
                  }
                >
                  <MinusIcon className="h-4 w-4 text-gray-600" />
                </button>
                <span className="mx-2 w-8 text-center">
                  {cartItems.find(
                    (i) =>
                      Number(i.id) ===
                      Number(item?.card?.info?.id)
                  )?.quantity || 0}
                </span>
                <button
                  className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
                  onClick={() =>
                    addItem({
                      id: Number(item?.card?.info?.id),
                      quantity: 1,
                      price:
                        item?.card?.info?.price / 100 ||
                        Number(item?.card?.info?.defaultPrice) /
                          100,
                      name: item?.card?.info?.name,
                      image: item?.card?.info?.imageId,
                      restaurant: resInfo.name,
                    })
                  }
                >
                  <PlusIcon className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              <button
                className="px-3 py-1 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors duration-200"
                onClick={() =>
                  addItem({
                    id: Number(item?.card?.info?.id),
                    quantity: 1,
                    price:
                      item?.card?.info?.price / 100 ||
                      Number(item?.card?.info?.defaultPrice) /
                        100,
                    name: item?.card?.info?.name,
                    image: item?.card?.info?.imageId,
                    restaurant: resInfo.name,
                  })
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>)
}

export default MenuItem