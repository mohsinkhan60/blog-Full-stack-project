"use client";

import { Bell, ChevronDown, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useAuth } from "../auth";
import { logoutUser } from "../redux/userSlice";
import { UserDropdown } from "./Home/User";
import { FaPlaneUp } from "react-icons/fa6";

const Navbar = () => {
  const user = useSelector((state) => state.user?.user || null);
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logged] = useAuth();
  const navigate = useNavigate(); // Initialize navigate

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const logoutt = () => {
    navigate("/login")
    dispatch(logoutUser())
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-md"
          : "bg-white/50 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold">
              <FaPlaneUp />
              </div>
              <span className="ml-2 text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                {user?.username ? `Welcome ${user.username}` : "Welcome to our web-site"}
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a
              href="#"
              className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </a>
            <div className="relative group">
              <button className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center">
                Products
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                >
                  Product 1
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                >
                  Product 2
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                >
                  Product 3
                </a>
              </div>
            </div>
            <a
              href="#"
              className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
            >
              Services
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </a>
          </div>

          {/* Right side icons */}
          {logged ? (
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-gray-500 hover:text-purple-600 transition-colors duration-200">
                <Search className="h-5 w-5" />
              </button>
              <button className="text-gray-500 hover:text-purple-600 transition-colors duration-200 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <UserDropdown />
            </div>
          ) : (
            <div className="gap-2 flex">
              <button
                onClick={() => navigate("/signup")} // Use navigate for routing
                className="px-5 py-2 border rounded-full hidden md:flex cursor-pointer hover:bg-purple-400 hover:text-white"
              >
                Sign up
              </button>
              <button
                onClick={() => navigate("/login")} // Use navigate for routing
                className="px-5 py-2 border rounded-full hidden md:flex cursor-pointer hover:bg-purple-400 hover:text-white"
              >
                Login
              </button>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-purple-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
          >
            Home
          </a>
          <div className="relative">
            <button
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 flex justify-between items-center"
              onClick={(e) => {
                e.preventDefault();
                const submenu = e.currentTarget.nextElementSibling;
                if (submenu.style.maxHeight) {
                  submenu.style.maxHeight = null;
                } else {
                  submenu.style.maxHeight = submenu.scrollHeight + "px";
                }
              }}
            >
              Products
              <ChevronDown className="h-4 w-4" />
            </button>
            <div
              className="overflow-hidden max-h-0 transition-all duration-300"
              style={{ maxHeight: "0px" }}
            >
              <a
                href="#"
                className="block pl-6 pr-3 py-2 text-base font-medium text-gray-500 hover:text-purple-600 hover:bg-purple-50"
              >
                Product 1
              </a>
              <a
                href="#"
                className="block pl-6 pr-3 py-2 text-base font-medium text-gray-500 hover:text-purple-600 hover:bg-purple-50"
              >
                Product 2
              </a>
              <a
                href="#"
                className="block pl-6 pr-3 py-2 text-base font-medium text-gray-500 hover:text-purple-600 hover:bg-purple-50"
              >
                Product 3
              </a>
            </div>
          </div>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
          >
            Services
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
          >
            About
          </a>
          {logged ? (
            <a
              onClick={() => logoutt()  }
              href="/login"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
            >
              Logout
            </a>
          ) : (
            <a
              href="/signup"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
            >
              Sign UP
            </a>
          )}

          <div className="pt-4 pb-3 border-t border-gray-200"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
