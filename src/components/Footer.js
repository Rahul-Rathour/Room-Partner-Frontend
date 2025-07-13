import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-8 border-t border-gray-700 mt-10">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col gap-6 sm:flex-row sm:justify-between items-center text-center sm:text-left">
        
        {/* Branding + Legal */}
        <div className="flex flex-col gap-2">
          <Link to="/" className="text-white hover:text-green-400 font-semibold italic text-xl">
            Room<span className="text-green-400 hover:text-white">Partner</span>
          </Link>
          <span className="text-sm text-gray-400">© 2024 Room-partner, Inc</span>
          <span className="text-sm text-gray-400">
            Built & owned by <span className="text-green-400 font-medium">Rahul</span>
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-2">
          <Link to="/privacy-policy" className="text-sm text-gray-300 hover:text-green-400 transition">
            Privacy Policy
          </Link>
          <Link to="/contact" className="text-sm text-gray-300 hover:text-green-400 transition">
            Contact
          </Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-4">
          <a href="https://www.facebook.com/rathor.king.90/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-500 transition">
            <FaFacebookF />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-sky-400 transition">
            <FaTwitter />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-pink-500 transition">
            <FaInstagram />
          </a>
          <a href="https://www.linkedin.com/in/rahul-mern/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-700 transition">
            <FaLinkedin />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
