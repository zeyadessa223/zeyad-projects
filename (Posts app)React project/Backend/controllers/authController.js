const { User, validateUser } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
require("dotenv").config();

// Function to sign up a new user
async function signUpUser(req, res) {
  try {
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const password = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      username: req.body.username,
      password,
      useremail: req.body.useremail,
    });
    res.json({ message: "User registered successfully" });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      return res.status(400).json({ error: "Email address is already in use" });
    }
    res.status(500).json({ error: error.message });
  }
}
// Function to log in a user
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "20h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get post by ID
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to create a new post
const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const post = new Post({
      title,
      description,
    });
    await post.save();
    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to update a post
const updatePost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to delete a post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signUpUser,
  loginUser,
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
