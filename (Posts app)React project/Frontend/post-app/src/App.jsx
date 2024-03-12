import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Posts from "./components/Posts";
import AddPost from "./components/AddPost";
import UpdatePost from "./components/UpdatePost";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/addpost" element={<AddPost />} />
        <Route path="/updatepost/:id" element={<UpdatePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
