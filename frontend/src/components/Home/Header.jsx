import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DeletePopup from "../../pages/UI-pages/delete-popup";
import PopupForm from "../../pages/UI-pages/popup-form";
import UpdatePopup from "../../pages/UI-pages/UpdatePopup";
import Navbar from "../Navbar";

const Header = () => {
  const [userData, setUserData] = useState([]); // State to store fetched blogs
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedId, setSelectedId] = useState(null); // State to store the selected item's ID

  const token = useSelector((state) => state.user.user); // Access token from Redux

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
      toast.error("No item selected for deletion.", {
        position: "top-right",
      });
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
        return response.text(); // Use response.text() instead of response.json() for empty responses
      })
      .then(() => {
        // Remove the deleted blog from the state
        setUserData((prevData) =>
          prevData.filter((item) => item.id !== selectedId)
        );
        setSelectedId(null); // Clear the selected ID
        setShowDeletePopup(false);
        toast.success("Blog deleted successfully.", {
          position: "top-right",
        });
      })
      .catch((error) => {
        console.error("Error deleting blog:", error);
        setShowDeletePopup(false);
        toast.error("Failed to delete the blog. Please try again.", {
          position: "top-right",
        });
      });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        <PopupForm
          onBlogCreated={(newBlog) =>
            setUserData((prevData) => [...prevData, newBlog])
          }
        />

        <div className="py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Our Website
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            This is a beautiful responsive navbar built with React and Tailwind
            CSS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {userData.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-end mb-3 space-x-2">
                <button
                  onClick={() => {
                    setSelectedId(item.id);
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
          onSubmit={(updatedData) => {
            // console.log("Updated Data:", updatedData);
            fetch(`http://localhost:5000/blog/blogs/${selectedId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.access_token}`,
              },
              body: JSON.stringify(updatedData),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Failed to update the blog.");
                }
                return response.json();
              })
              .then((updatedBlog) => {
                // Update the blog in the state
                setUserData((prevData) =>
                  prevData.map((item) =>
                    item.id === selectedId ? { ...item, ...updatedBlog } : item
                  )
                );
                setShowUpdatePopup(false);
                toast.success("Blog updated successfully!", {
                  position: "top-right",
                });
              })
              .catch((error) => {
                console.error("Error updating blog:", error);
                toast.error("Failed to update the blog. Please try again.", {
                  position: "top-right",
                });
              });
          }}
          initialValues={userData.find((item) => item.id === selectedId) || {}}
        />
      </main>
    </div>
  );
};

export default Header;
