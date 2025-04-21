import { useEffect, useState } from "react";
import { UserDrop } from "../../pages/UI-pages/menu";
import Navbar from "../Navbar";

const Header = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
      fetch('http://localhost:5000/blog/blogs')
          .then(response => response.json())
          .then(data => setUserData(data));
  }, []);
  console.log(userData)
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        <div className="py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Our Website
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            This is a beautiful responsive navbar built with React and Tailwind
            CSS. Try resizing your browser to see how it adapts to different
            screen sizes.
          </p>
        </div>

        {/* Content placeholders */}
        <div className="grid grid-cols-1 relative md:grid-cols-3 gap-8 mb-20">
          {userData.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="cursor-pointer">
                <UserDrop />
              </div>
              <div className="h-40 bg-gradient-to-r from-purple-100 to-pink-100 rounded-md mb-4">
                <img src={item.image} alt="" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h2>
              <p className="text-gray-600">
              {item.description}
              </p>
              <p>{item.author}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
export default Header;
