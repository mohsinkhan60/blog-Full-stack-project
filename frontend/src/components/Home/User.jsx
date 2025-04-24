"use client";

import { useState, useEffect } from "react";
import { User, Settings, LogOut, HelpCircle, Bell } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../auth";
import { logoutUser } from "../../redux/userSlice";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import PopupForm from "../../pages/UI-pages/popup-form";

export function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Get the dropdown element by its data attribute
      const dropdown = document.querySelector('[data-dropdown="user-menu"]');

      // Check if the click was outside the dropdown
      if (dropdown && !dropdown.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logoutt = () => {
    logout();
    dispatch(logoutUser())
  };

  return (
    <div className="relative" data-dropdown="user-menu">
      {/* User Avatar Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-purple-100">
          <User className="h-5 w-5 text-purple-600" />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">{user.data.username}</p>
              <p className="text-xs text-gray-500 truncate">
                {user.data.email}
              </p>
            </div>

            {/* Menu Items */}
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <MdOutlineCreateNewFolder className="mr-3 h-4 w-4 text-gray-500" />
              Create Blogs
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <Settings className="mr-3 h-4 w-4 text-gray-500" />
              Account Settings
            </a>

            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <Bell className="mr-3 h-4 w-4 text-gray-500" />
              Notifications
            </a>

            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <HelpCircle className="mr-3 h-4 w-4 text-gray-500" />
              Help & Support
            </a>

            <div onClick={() => logoutt()} className="border-t border-gray-100">
              <a
                href="#"
                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                role="menuitem"
              >
                <LogOut className="mr-3 h-4 w-4 text-red-500" />
                Sign out
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
