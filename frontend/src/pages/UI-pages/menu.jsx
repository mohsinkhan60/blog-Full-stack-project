"use client";

import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import DeletePopup from "./delete-popup";
import UpdatePopup from "./UpdatePopup";

export function UserDrop() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [itemName, setItemName] = useState("Sample Item");

  const handleDelete = () => {
    alert("Deleted: " + itemName);
    setShowDeletePopup(false);
    setDropdownOpen(false);
  };

  const handleUpdate = (updatedName) => {
    setItemName(updatedName);
    alert("Updated to: " + updatedName);
    setShowUpdatePopup(false);
    setDropdownOpen(false);
  };

  return (
    <div className="relative" data-dropdown="user-menu">
      {/* Trigger Button */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center mb-3 justify-center w-7 h-7 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition"
      >
        <HiDotsHorizontal />
      </button>

      {/* Dropdown */}
      {dropdownOpen && (
        <div className="absolute mt-2 right-0 w-40 rounded-xl shadow-lg bg-white border z-20">
          {/* Close Button */}
          <div className="flex justify-end px-2 pt-2">
            <button
              onClick={() => setDropdownOpen(false)}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-1 rounded-full transition"
            >
              <IoCloseSharp className="w-5 h-5" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col px-2 pb-2">
            <button
              onClick={() => setShowUpdatePopup(true)}
              className="text-left text-sm text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition"
            >
              Update
            </button>
            <button
              onClick={() => setShowDeletePopup(true)}
              className="text-left text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Popups */}
      <DeletePopup
        isOpen={showDeletePopup}
        onClose={() => setShowDeletePopup(false)}
        onConfirm={handleDelete}
      />

      <UpdatePopup
        isOpen={showUpdatePopup}
        onClose={() => setShowUpdatePopup(false)}
        onSubmit={handleUpdate}
        initialValue={itemName}
      />
    </div>
  );
}
