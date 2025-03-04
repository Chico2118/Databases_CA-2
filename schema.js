const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Movie: {
    title: {
      type: String,
      require: true,
    },
    director: {
      type: String,
      require: true,
    },
    genre: {
      type: String,
      require: true,
    },
    releaseYear: {
      type: Number,
    },
    availableCopies: {
      type: Number,
      require: true,
    },
  },
});

const user = mongoose.model("User", userSchema);

module.exports = user;
