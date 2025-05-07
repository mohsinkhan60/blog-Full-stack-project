import React, { useState } from "react";
import { toast } from "react-toastify";

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload.", {
        position: "top-right",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message, {
          position: "top-right",
        });
        setFile(null); // Reset the file input
        if (onFileUpload) onFileUpload(data.file_path); // Notify parent component
      } else {
        const errorText = await response.text();
        console.error("Error Response:", errorText);
        toast.error("Failed to upload the file. Please try again.", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload the file. Please try again.", {
        position: "top-right",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="rounded-lg w-full max-w-md">
        <div className="mb-4">
          <label
            htmlFor="file"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Choose a file
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default FileUpload;