const express = require("express");
const mongoose = require("mongoose");
const User = require("./schema");

const app = express();
app.use(express.json());
require("dotenv").config();

const PORT = process.env.PORT;
const URL = process.env.DB_URL;

mongoose
  .connect(URL)
  .then(() => {
    console.log("Successfully Connected to MONGODB");
  })
  .catch((err) => {
    console.log("Not able to connect the database.");
  });

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: "Internal server Error" });
  }
});

app.post("/users", async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "title is required" });
  }

  try {
    const newuser = new User({ title });
    await newuser.save();

    return res.status(201).json(`Movie added successfully ${newuser.Movie}`);
  } catch (err) {
    return res.status(500).json({ error: "Failed to add movie" });
  }
});

app.delete("/users/delete/:id", async (req, res) => {
  try {
    const deletedMovie = await User.findByIdAndDelete(req.params.id);

    if (!deletedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    return res.status(201).json("Movie deleted");
  } catch (err) {
    res.status(500).json({ error: "Internal Server error" });
  }
});

app.put("/users/changedetails/:id", async (req, res) => {
  const id = req.params.id;
  const { title, director, genre, relaseYear, availableCopies } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Bad request" });
  }

  try {
    const updatedMovie = await User.findByIdAndUpdate(
      id,
      { title, director, genre, relaseYear, availableCopies },
      { new: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    return res.status(201).json("Movie Updated");
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
