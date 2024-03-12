import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleAddPost = async () => {
    try {
      const token = localStorage.getItem("token");

      // Send title and description to the backend
      const response = await axios.post(
        "http://localhost:5000/userposts",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Post added successfully");
      navigate("/posts");
    } catch (error) {
      // Handle error
      console.error("Error:", error);
      alert("Error adding post");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-cyan-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 text-lg">
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 text-2xl"
            htmlFor="title"
          >
            Post title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 text-2xl"
            htmlFor="description"
          >
            Post description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleAddPost}
          >
            Add post
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
