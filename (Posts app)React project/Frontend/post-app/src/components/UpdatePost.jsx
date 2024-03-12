import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdatePost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/userposts/${id}`
        );
        const { title, description } = response.data; // Assuming your API returns title and description
        setTitle(title);
        setDescription(description);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]); // Fetch post whenever _id changes

  const handleUpdatePost = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/userposts/${id}`,
        {
          title: title,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Post updated successfully");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert("Error: " + error.response.data.message);
      } else if (error.request) {
        console.log(error.request);
        alert("No response received from the server");
      } else {
        console.log("Error", error.message);
        alert("Error: " + error.message);
      }
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form className="bg-cyan-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 text-lg">
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
            value={title} // Use value attribute to show the title
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
            value={description} // Use value attribute to show the description
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleUpdatePost}
          >
            Update post
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;
