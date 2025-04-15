import Navbar from "../Navbar";

const Header = () => {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-40 bg-gradient-to-r from-purple-100 to-pink-100 rounded-md mb-4"></div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Feature Section {item}
              </h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
export default Header;
