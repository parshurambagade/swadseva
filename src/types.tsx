export interface FoodItemAttribute {
  vegClassifier: string;
}

export interface FoodRibbon {
  text: string;
  textColor: string;
  topBackgroundColor: string;
  bottomBackgroundColor: string;
}

export interface AggregatedRating {
  rating: string;
  ratingCount: string;
  ratingCountV2: string;
}

export interface FoodRatings {
  aggregatedRating: AggregatedRating;
}

export interface DishInfo {
  id: string;
  name: string;
  category: string;
  description: string;
  imageId: string;
  inStock: number;
  isVeg: number;
  defaultPrice?: number;
  price: number;
  variants: Record<string, unknown>;
  variantsV2: Record<string, unknown>;
  itemAttribute: FoodItemAttribute;
  ribbon: FoodRibbon;
  type: string;
  itemBadge: Record<string, unknown>;
  badgesV2: Record<string, unknown>;
  isBestseller: boolean;
  ratings: FoodRatings;
}

export interface DishCard {
  "@type": string;
  info: DishInfo;
  analytics: Record<string, unknown>;
  hideRestaurantDetails: boolean;
}

export interface ItemCard {
  card: DishCard;
}

export interface ItemCategoryCard {
  "@type": string;
  title: string;
  itemCards: ItemCard[];
}

export interface Card {
  card: ItemCategoryCard;
}

export interface FoodMenu {
  card: Card;
}

export interface Slugs {
    restaurant: string;
    city: string;
  }
  
  export interface Fee {
    restaurantId: string;
    fees: object[]; // Assuming fees can have multiple objects.
  }
  
  export interface SLA {
    restaurantId: string;
    lastMileTravel: number;
    serviceability: string;
    rainMode: string;
    longDistance: string;
    lastMileTravelString: string;
    iconType: string;
    deliveryTime?: number;
    slaString?: string;
  }
  
  export interface Availability {
    nextCloseTime: string;
    visibility: boolean;
    opened: boolean;
    restaurantClosedMeta: object;
  }
  
  export interface DiscountInfo {
    meta: string;
    discountType: string;
    operationType: string;
  }
  
  export interface AggregatedDiscountInfo {
    header: string;
    shortDescriptionList: DiscountInfo[];
    descriptionList: DiscountInfo[];
    visible: boolean;
  }
  
  export interface Label {
    title: string;
    message: string;
  }
  
  export interface OrderabilityCommunication {
    title: TextContent;
    subTitle: TextContent;
    message: Message;
    customIcon: CustomIcon;
  }
  
  export interface CustomIcon {
    bgGradientColorStart: string;
    bgGradientColorEnd: string;
  }
  
  export interface TextContent {
    text: string;
  }
  
  export interface Message {
    text: string;
    textColour: string;
  }
  
  export interface NearestOutletSLA {
    deliveryTime: number;
    lastMileTravel: number;
    slaString: string;
    lastMileTravelString: string;
    iconType: string;
  }
  
  export interface NearestOutletAvailability {
    restaurantClosedMeta: object;
  }
  
  export interface NearestOutletDiscountInfo {
    visible: boolean;
  }
  
  export interface NearestOutletInfo {
    siblingOutlet: {
      id: string;
      city: string;
      slugs: object;
      areaName: string;
      costForTwo: string;
      feeDetails: object;
      sla: NearestOutletSLA;
      availability: NearestOutletAvailability;
      aggregatedDiscountInfo: NearestOutletDiscountInfo;
      badges: object;
      aggregatedDiscountInfoV2: NearestOutletDiscountInfo;
      availabilityServiceabilityMessage: string;
      cartOrderabilityNudgeBanner: object;
      featuredSectionInfo: object;
    };
  }
  
  export interface NearestOutletNudge {
    nearestOutletInfo: NearestOutletInfo;
    nearestOutletComms: {
      title: TextContent;
      subTitle: TextContent;
    };
  }
  
  export interface CartOrderabilityNudgeBanner {
    parameters: object;
    presentation: object;
  }
  
  export interface Info {
    id: string;
    name: string;
    city: string;
    slugs: Slugs;
    uniqueId: string;
    cloudinaryImageId: string;
    locality: string;
    areaName: string;
    costForTwo: string;
    costForTwoMessage: string;
    cuisines: string[];
    avgRating: number;
    feeDetails: Fee;
    parentId: string;
    avgRatingString: string;
    totalRatingsString: string;
    sla: SLA;
    availability: Availability;
    aggregatedDiscountInfo: AggregatedDiscountInfo;
    badges: object;
    slugString: string;
    multiOutlet: boolean;
    isOpen: boolean;
    labels: Label[];
    logo: string;
    totalRatings: number;
    aggregatedDiscountInfoV2: AggregatedDiscountInfo;
    type: string;
    veg?: boolean;
    headerBanner: {
      url: string;
    };
    ratingSlab: string;
    availabilityServiceabilityMessage: string;
    orderabilityCommunication: OrderabilityCommunication;
    hasBestsellerItems: boolean;
    nearestOutletNudge: NearestOutletNudge;
    cartOrderabilityNudgeBanner: CartOrderabilityNudgeBanner;
    latLong: string;
    backgroundImageOverlayInfo: object;
    featuredSectionInfo: object;
  }
  
  export interface RestaurantCardType {
    "@type": string;
    info: Info;
    analytics: object;
  }
  
  export interface Relevance {
    type: string;
    sectionId: string;
  }
  
  export interface RestaurantResponse {
    card: {
      card: RestaurantCardType;
      relevance: Relevance;
    };
  }
  
  export interface CartItem {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
    restaurant: string;
  }

export interface MenuContainerType {
  menuItems: FoodMenu[];
  toggleCategory: (category: string) => void;
  openCategories: string[];
  removeItem: (id: number) => void;
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  resInfo: Info;
}

export interface CartContextType {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  totalItems: number;
  setTotalItems: React.Dispatch<React.SetStateAction<number>>;
  totalAmount: number;
  setTotalAmount: React.Dispatch<React.SetStateAction<number>>;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearItem: (id: number) => void;
  clearCart: () => void;
} 

export interface ResContextType {
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
  Error: string;  
  showToast: boolean;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  location: {
    latitude: number;
    longitude: number;
  } | null;
}

export interface OrderItem {
  id: number;
  itemName: string;
  restaurantName: string;
  price: number;
  quantity: number;
  total: number;
  orderDate: string;
}
export interface OrdersContextType {
  orders: OrderItem[];
  setOrders: React.Dispatch<React.SetStateAction<OrderItem[]>>;
}