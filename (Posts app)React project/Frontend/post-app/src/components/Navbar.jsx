import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleSignout = async () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="bg-blue-500 p-4 flex items-center justify-between mb-10 ">
      {/* Left-aligned logo */}
      <h1 className="text-white text-3xl font-bold">Logo</h1>

      {/* Center-aligned home link */}
      <div>
        <Link to="/" className="text-white text-lg font-bold">
          Home
        </Link>
      </div>
      <div className="flex items-center justify-between">
        {/* Right-aligned sign-in link */}
        <div className="mr-2">
          <Link to="/signup">
            <button className="bg-green-700 text-white px-4 py-2 rounded-md">
              Sign up
            </button>
          </Link>
        </div>
        <div className="ml-2">
          <Link to="/login">
            <button className="bg-indigo-900 text-white px-4 py-2 rounded-md">
              Log In
            </button>
          </Link>
        </div>
        <div className="ml-2">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={handleSignout}
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
