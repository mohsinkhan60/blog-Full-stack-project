import { useEffect, useState } from "react";
import { UserDrop } from "../../pages/UI-pages/menu";
import Navbar from "../Navbar";
import PopupForm from "../../pages/UI-pages/popup-form";

const Header = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/blog/blogs")
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }, []);
  // console.log(userData)
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        <div>
          <PopupForm />
        </div>
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
              {item.image ? (
                <div>
                  <img
                    src={item.image}
                    className="h-40 w-full bg-gradient-to-r from-purple-100 to-pink-100 rounded-md mb-4"
                    alt=""
                  />
                </div>
              ) : (
                <div>
                  <img
                    src="https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-picture-coming-creative-vector-png-image_40968940.jpg"
                    className="h-40 rounded-md mb-4"
                    alt=""
                  />
                </div>
              )}
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h2>
              <p className="text-gray-600">{item.description}</p>
              <p>{item.author}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
export default Header;
