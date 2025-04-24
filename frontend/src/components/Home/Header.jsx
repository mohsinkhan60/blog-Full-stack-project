import { useEffect, useState } from "react";
import DeletePopup from "../../pages/UI-pages/delete-popup";
import PopupForm from "../../pages/UI-pages/popup-form";
import UpdatePopup from "../../pages/UI-pages/UpdatePopup";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";

const Header = () => {
  const [userData, setUserData] = useState([]); // State to store fetched blogs
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [itemName, setItemName] = useState("");
  const [selectedId, setSelectedId] = useState(null); // State to store the selected item's ID

  const token = useSelector((state) => state.user.user); // Access token from Redux
  function refreshPage() {
    window.location.reload(false);
  }

  // Fetch blogs from the API
  const fetchBlogs = () => {
    fetch("http://localhost:5000/blog/blogs")
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error fetching blogs:", error));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle Delete
  const handleDelete = () => {
    if (!selectedId) {
      alert("No item selected for deletion.");
      return;
    }

    fetch(`http://localhost:5000/blog/blogs/${selectedId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`, // Use the token directly
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete the blog.");
        }
        refreshPage()
        return response.json();
      })
      .then(() => {
        // Remove the deleted blog from the state
        setUserData((prevData) => prevData.filter((item) => item.id !== selectedId));
        setSelectedId(null); // Clear the selected ID
        setShowDeletePopup(false);
      })
      .catch((error) => {
        console.error("Error deleting blog:", error);
        setShowDeletePopup(false);
      });
  };

  // Handle Update
  const handleUpdate = (updatedName) => {
    if (!selectedId) {
      alert("No item selected for update.");
      return;
    }

    fetch(`http://localhost:5000/blog/blogs/${selectedId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`, // Use the token directly
      },
      body: JSON.stringify({ title: updatedName }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update the blog.");
        }
        return response.json();
      })
      .then(() => {
        fetchBlogs(); // Refresh the list of blogs
        setShowUpdatePopup(false);
      })
      .catch((error) => {
        console.error("Error updating blog:", error);
        setShowUpdatePopup(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        <PopupForm />

        <div className="py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Our Website
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            This is a beautiful responsive navbar built with React and Tailwind CSS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {userData.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-end mb-3 space-x-2">
                <button
                  onClick={() => {
                    setSelectedId(item.id);
                    setItemName(item.title);
                    setShowUpdatePopup(true);
                  }}
                  className="text-sm text-white hover:text-blue-600 bg-blue-500 hover:bg-blue-200 px-3 py-1 rounded transition"
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    setSelectedId(item.id);
                    setShowDeletePopup(true);
                  }}
                  className="text-sm text-white hover:text-red-600 bg-red-500 hover:bg-red-200 px-3 py-1 rounded transition"
                >
                  Delete
                </button>
              </div>

              <img
                src={
                  item.image ||
                  "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-picture-coming-creative-vector-png-image_40968940.jpg"
                }
                className="h-40 w-full object-cover rounded-md mb-4"
                alt=""
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h2>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-sm text-gray-500 mt-1">{item.author}</p>
            </div>
          ))}
        </div>

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
      </main>
    </div>
  );
};

export default Header;