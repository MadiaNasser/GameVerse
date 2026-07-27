const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  genre: {
    type: String,
    required: true,
  },

  platform: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  rating: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Game", gameSchema);