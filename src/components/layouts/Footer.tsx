const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container grid grid-cols-1 lg:grid-cols-2 mx-auto px-4 md:px-8 lg:px-4
       md:text-center">
        <p className="text-lg mb-8 md:mb-6 lg:mb-0 lg:pt-2 md:mt-2  lg:col-span-2">
          &copy; 2024 SwadSeva. All rights reserved.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:text-center lg:max-w-max lg:mx-auto lg:col-span-2 text-left md:px-8 md:py-4 lg:pt-8  gap-6 justify-center">
          <p className="cursor-pointer hover:text-orange-300 transition-colors duration-200">
            About Us
          </p>
          <p className="cursor-pointer hover:text-orange-300 transition-colors duration-200">
            Contact
          </p>
          <p className="cursor-pointer hover:text-orange-300 transition-colors duration-200">
            Terms of Service
          </p>
          <p className="cursor-pointer hover:text-orange-300 transition-colors duration-200">
            Privacy Policy
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
