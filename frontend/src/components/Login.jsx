"use client";

import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Data:", formData);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData), // Use formData instead of undefined data
    };

    fetch("http://localhost:5000/auth/login", requestOptions) // Ensure the correct backend URL
      .then((res) => {
        if (!res.ok) {
          throw new Error("Invalid username or password");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.access_token);
        // Save the token to localStorage or context
        localStorage.setItem("access_token", data.access_token);
        // Redirect to the home page
        window.location.href = "/";
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Invalid username or password");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>
        </div>

        {errorMessage && (
          <div className="mb-4 text-center text-sm text-red-600">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md mt-6 transition duration-200"
          >
            Login
          </button>

          <div className="mt-4 text-center text-sm text-gray-600">
            Create new an account?
            <a href="/signup" className="text-blue-600 hover:underline mx-3">
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;