const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-lg mb-4">
          &copy; 2023 FoodExpress. All rights reserved.
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href="#"
            className="hover:text-orange-300 transition-colors duration-200"
          >
            About Us
          </a>
          <a
            href="#"
            className="hover:text-orange-300 transition-colors duration-200"
          >
            Contact
          </a>
          <a
            href="#"
            className="hover:text-orange-300 transition-colors duration-200"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="hover:text-orange-300 transition-colors duration-200"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer