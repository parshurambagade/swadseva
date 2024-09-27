import React from 'react';
import { Twitter, Instagram, Linkedin, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-bold mb-4">SwadSeva</h3>
            <p className="text-sm">Delivering delicious meals to your doorstep since 2024.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-orange-200 transition-colors duration-200">About Us</a></li>
              <li><a href="#" className="hover:text-orange-200 transition-colors duration-200">Contact</a></li>
              <li><a href="#" className="hover:text-orange-200 transition-colors duration-200">Careers</a></li>
              <li><a href="#" className="hover:text-orange-200 transition-colors duration-200">Partner with Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-orange-200 transition-colors duration-200">Terms of Service</a></li>
              <li><a href="#" className="hover:text-orange-200 transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-orange-200 transition-colors duration-200">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-orange-200 transition-colors duration-200">Refund Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect with Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-orange-200 transition-colors duration-200">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-orange-200 transition-colors duration-200">
                <Twitter size={24} />
              </a>
              <a href="#" className="hover:text-orange-200 transition-colors duration-200">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-orange-200 transition-colors duration-200">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-600 text-center">
          <p className="text-sm">&copy; 2024 SwadSeva. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;