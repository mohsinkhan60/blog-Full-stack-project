"use client";

import { useEffect, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";

export function UserDrop() {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <div className="relative" data-dropdown="user-menu">
      {/* User Avatar Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-7 h-7 mb-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <HiDotsHorizontal />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute p-3 rounded-md shadow-lg bg-gray-200 ring-opacity-5 focus:outline-none z-10">
          <div className="flex flex-col gap-2">
            <button className="bg-red-500 p-1 px-3 rounded-full text-white">
              Delete
            </button>
            <button className="bg-green-500 p-1 px-3 rounded-full text-white">
              update
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
