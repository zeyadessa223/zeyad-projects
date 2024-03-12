require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});

    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
};
module.exports = connectDB;
