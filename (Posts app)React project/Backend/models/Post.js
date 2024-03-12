const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxlength: 500,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  image: {
    public_id: {
      type: String,
    },
    url: {
      type: String, // Store the URL of the image
    },
  },
});

const post = mongoose.model("Post", schema);
module.exports = post;
