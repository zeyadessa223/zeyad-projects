import React, { useState } from "react";
import loginImage from "../assets/images/login.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/userposts/login", {
        username: username,
        password: password,
      });
      const token = res.data.token;
      localStorage.setItem("token", token);
      alert("you are logged in successfully");
      navigate("/posts");
    } catch (error) {
      alert("invalid username or password");
    }
  };
  return (
    <div className="flex justify-center mt-10 p-4 px-6">
      <div className="w-full max-w-xs">
        <img src={loginImage} alt="Login" style={{ height: "200px" }} />
      </div>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-2xl">
        <h1>Login tor page</h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 text-3xl mt-5"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 text-3xl"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleLogin}
          >
            Login now!
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
