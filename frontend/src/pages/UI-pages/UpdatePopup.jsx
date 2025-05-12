"use client";

import { Pencil, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function UpdatePopup({
  isOpen,
  onClose,
  onSubmit,
  initialValues = {},
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [formValues, setFormValues] = useState({
    title: initialValues.title || "",
    image: initialValues.image || "",
    description: initialValues.description || "",
    author: initialValues.author || "",
  });
  const popupRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setFormValues({
        title: initialValues.title || "",
        image: initialValues.image || "",
        description: initialValues.description || "",
        author: initialValues.author || "",
      });
    } else {
      const timer = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]); // Removed `initialValues` from dependency array to prevent infinite loop

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 transition-opacity duration-200 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        ref={popupRef}
        className={`bg-white rounded-xl shadow-lg w-full max-w-md transform transition-transform duration-200 ${
          isOpen ? "scale-100" : "scale-95"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center gap-2">
            <Pencil className="text-blue-500 h-5 w-5" />
            <h2 className="text-lg font-semibold text-gray-800">Update Blog</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition rounded-full p-1 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formValues);
            onClose();
          }}
          className="p-4"
        >
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formValues.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            required
          />

          <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={formValues.image}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />

          <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formValues.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            rows="4"
            required
          ></textarea>

          <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">
            Author
          </label>
          <input
            type="text"
            name="author"
            value={formValues.author}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            required
          />

          <div className="flex justify-end gap-2 mt-6 border-t pt-4 bg-gray-50 rounded-b-xl">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
