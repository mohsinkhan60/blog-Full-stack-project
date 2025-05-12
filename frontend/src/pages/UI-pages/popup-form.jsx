"use client";

import { useState } from "react";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function PopupForm({ onBlogCreated }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    description: "",
    author: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const tokenn = useSelector((state) => state.user.user);

  const openPopup = () => setIsOpen(true);

  const closePopup = () => {
    if (!isSubmitting) {
      setIsOpen(false);
      setTimeout(() => {
        setFormData({ image: "", title: "", description: "", author: "" });
        setErrors({});
        setIsSubmitted(false);
      }, 300);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required";
    } else if (
      !/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/.test(formData.image)
    ) {
      newErrors.image = "Invalid image URL";
    }

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.author.trim()) {
      newErrors.author = "Author is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);

      try {
        const token = tokenn.access_token;
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        };

        const response = await fetch(
          "http://localhost:5000/blog/blogs",
          requestOptions
        );
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error Response:", errorData);
          throw new Error(`Failed to create blog: ${response.statusText}`);
        }

        const newBlog = await response.json(); // Get the newly created blog
        onBlogCreated(newBlog); // Update the parent state with the new blog

        setIsSubmitted(true);
        toast.success("Blog created successfully!", {
          position: "top-right",
        });

        setTimeout(() => {
          closePopup();
        }, 2000);
      } catch (error) {
        console.error("Form submission failed:", error.message);
        toast.error("Failed to create blog. Please login again.", {
          position: "top-right",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast.error("Please fix the errors in the form.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="flex items-center justify-end p-4">
      <button
        onClick={openPopup}
        className="rounded-md bg-green-500 flex items-center justify-center px-4 py-2 font-medium text-white transition-colors hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        <MdOutlineCreateNewFolder className="mr-3 h-4 w-4" />
        Create new Blog
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={!isSubmitting ? closePopup : undefined}
          />

          <div className="relative z-20 w-full max-w-[23rem] md:max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Create Blog</h2>
              {!isSubmitting && (
                <button
                  onClick={closePopup}
                  className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            <div>
              {isSubmitted ? (
                <div className="rounded-md bg-green-50 p-4 text-center">
                  <p className="text-green-800">Blog created successfully!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-2 md:mb-4">
                    <label
                      htmlFor="image"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Image URL
                    </label>
                    <input
                      type="text"
                      id="image"
                      name="image"
                      value={formData.image}
                      placeholder="Enter image URL"
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`w-full rounded-md border ${
                        errors.image ? "border-red-500" : "border-gray-300"
                      } px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    />
                    {errors.image && (
                      <p className="text-xs text-red-500">{errors.image}</p>
                    )}
                  </div>

                  <div className="mb-2 md:mb-4">
                    <label
                      htmlFor="title"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Enter title"
                      value={formData.title}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`w-full rounded-md border ${
                        errors.title ? "border-red-500" : "border-gray-300"
                      } px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    />
                    {errors.title && (
                      <p className="text-xs text-red-500">{errors.title}</p>
                    )}
                  </div>

                  <div className="mb-2 md:mb-4">
                    <label
                      htmlFor="description"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows="4"
                      placeholder="Enter description"
                      value={formData.description}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`w-full rounded-md border ${
                        errors.description
                          ? "border-red-500"
                          : "border-gray-300"
                      } px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    ></textarea>
                    {errors.description && (
                      <p className="text-xs text-red-500">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div className="mb-2 md:mb-4">
                    <label
                      htmlFor="author"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Author
                    </label>
                    <input
                      type="text"
                      id="author"
                      name="author"
                      placeholder="Enter author"
                      value={formData.author}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`w-full rounded-md border ${
                        errors.author ? "border-red-500" : "border-gray-300"
                      } px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    />
                    {errors.author && (
                      <p className="text-xs text-red-500">{errors.author}</p>
                    )}
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={closePopup}
                      disabled={isSubmitting}
                      className="rounded-md bg-gray-200 px-4 py-2 font-medium text-gray-800 transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
