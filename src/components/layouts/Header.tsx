import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const profile =
  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-orange-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={"./logo.png"} alt="SwadSeva" className="h-10" />
          </div>
          <div className="hidden sm:flex items-center space-x-6 lg:space-x-9">
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
          </div>
          <div className="cursor-pointer hidden sm:block relative">
            <img
              src={profile}
              alt="Profile"
              className="h-10 w-10 rounded-full border-2 border-white"
            />
            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
          </div>
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="sm:hidden mt-6 pb-4 text-center">
            <div className="cursor-pointer relative w-max mx-auto mt-4 mb-4 flex items-center">
              <img
                src={profile}
                alt="Profile"
                className="h-10 w-10 rounded-full border-2 border-white"
              />
              <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
            </div>
            {/* <hr /> */}
            <Link
              to="/"
              className="block py-3 hover:text-orange-200 transition-colors duration-200"
            >
              Home
            </Link>
            {/* <hr/> */}

            <Link
              to="/cart"
              className="block py-3 hover:text-orange-200 transition-colors duration-200"
            >
              Cart
            </Link>
            {/* <hr /> */}
            <Link
              to="/orders"
              className="block py-3 hover:text-orange-200 transition-colors duration-200"
            >
              Orders
            </Link>
            {/* <hr /> */}
            
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
