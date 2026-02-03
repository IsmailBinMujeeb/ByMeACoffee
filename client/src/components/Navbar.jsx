import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-white text-2xl font-bold tracking-tight">
              Buy Me A Coffee
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <a
                href="#home"
                className="text-white hover:text-gray-300 transition-colors duration-200 text-sm font-medium"
              >
                Home
              </a>
              <a
                href="#features"
                className="text-white hover:text-gray-300 transition-colors duration-200 text-sm font-medium"
              >
                Features
              </a>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              className="bg-white text-black px-6 py-2 text-sm font-semibold hover:bg-gray-200 transition-colors duration-200"
              onClick={() => navigate("/login")}
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#home"
              className="block text-white hover:bg-white/5 px-3 py-2 text-base font-medium"
            >
              Home
            </a>
            <a
              href="#features"
              className="block text-white hover:bg-white/5 px-3 py-2 text-base font-medium"
            >
              Features
            </a>
            <button
              className="w-full text-left bg-white text-black px-3 py-2 text-base font-semibold hover:bg-gray-200 transition-colors duration-200"
              onClick={() => navigate("/login")}
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
