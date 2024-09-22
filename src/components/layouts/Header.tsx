import { Link } from "react-router-dom";
const logo = '../../assets/swad-seva-logo.png';

const profile = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";
const Header = () => {

  return (
    <nav className="bg-orange-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src={'./logo.png'} alt="SwadSeva" className="h-10" />
          {/* <span className="text-2xl font-bold">FoodExpress</span> */}
        </div>
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="hover:text-orange-200 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/cart"
            className="hover:text-orange-200 transition-colors duration-200"
          >
            Cart
          </Link>
          <Link
            to="/orders"
            className="hover:text-orange-200 transition-colors duration-200"
          >
            Orders
          </Link>
          <div className="relative">
            <img
              src={profile}
              alt="Profile"
              className="h-10 w-10 rounded-full border-2 border-white"
            />
            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;