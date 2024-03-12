import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import EditImage from "../assets/images/edit.png";
import DeleteImg from "../assets/images/trash.png";
const Posts = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/userposts");
        // Assuming your backend API returns an array of posts
        setPosts(response.data.reverse());
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/userposts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(posts.filter((post) => post.id !== id));
        alert("Post deleted successfully");
      } catch (error) {
        alert("Error deleting post:");
      }
    }
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className=" p-4 w-96 m-auto rounded-lg mb-6">
        <Link to="/addpost">
          <button
            className="bg-white-200 border border-cyan-700 hover:bg-cyan-400 hover:text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Create your post
          </button>
        </Link>
      </div>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl text-center font-bold mb-2">
                {post.title}
              </h2>
              <p className="text-gray-700 text-center">{post.description}</p>
              <div>
                <img src={post.image}></img>
              </div>
              <div className="flex justify-around items-center">
                <Link to={`/updatepost/${post._id}`}>
                  <img
                    src={EditImage}
                    alt="edit"
                    className="w-6 h-6 cursor-pointer"
                  />
                </Link>
                <img
                  src={DeleteImg}
                  alt="edit"
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => handleDelete(post._id)}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
