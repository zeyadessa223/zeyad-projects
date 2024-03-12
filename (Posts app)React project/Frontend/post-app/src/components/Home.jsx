import React, { useState, useEffect } from "react";
import axios from "axios";
const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/userposts");
        // Assuming your backend API returns an array of posts
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once after the component mounts

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-cyan-300 p-4 w-96 m-auto rouded-lg mb-6">
        <h1 className="text-3xl font-bold mb-4 text-center  text-gray-700">
          Welcome to our website
        </h1>
      </div>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl text-center font-bold mb-2">
                {post.title}
              </h2>
              <p className="text-gray-700 text-center">{post.description}</p>
            </div>
            <div></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
