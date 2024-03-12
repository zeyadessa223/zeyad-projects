import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [useremail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/userposts/signup",
        {
          username: username,
          useremail: useremail,
          password: password,
        }
      );
      alert("You are successfully regsitered");
      navigator("/login");
    } catch (error) {
      alert("Can't sign up");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-lg">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 text-2xl"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 text-2xl"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 text-2xl"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
