// loads .env file into process.env
require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

// establishes a connection to the database
mongoose.connect(config.connectionString);

const User = require("./models/user.model");
const Note = require("./models/note.model");

const express = require("express");
const cors = require("cors");

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utils");

// creates an instance of an express app
const app = express();

// middleware to parse JSON
// bodies in incoming requests
app.use(express.json());

// middleware to enable
// CORS from all origins
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.json({ data: "Hello World!" });
});

// user create API
app.post("/user/create", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username) {
    return res
      .status(400)
      .json({ error: true, message: "Username is required" });
  }

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  try {
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res
        .status(409)
        .json({ error: true, message: "User already exists" });
    }

    const user = new User({
      username,
      email,
      password,
    });

    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    return res.json({
      error: false,
      message: "Registered successfully",
      user,
      accessToken,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

// user login API
app.post("/user/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  const foundUser = await User.findOne({ email: email });

  if (!foundUser) {
    return res.status(404).json({ message: "User not found" });
  }

  if (foundUser.email === email && foundUser.password === password) {
    const user = { user: foundUser };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    return res.json({
      error: false,
      message: "Logged in successfully",
      email,
      accessToken,
    });
  } else {
    return res
      .status(401)
      .json({ error: true, message: "Invalid email or password" });
  }
});

// note create API
app.post("/note/create", authenticateToken, async (req, res) => {
  const { title, content } = req.body;
  const { user } = req.user;

  if (!title) {
    return res.status(400).json({ error: true, message: "Title is required" });
  }

  if (!content) {
    return res
      .status(400)
      .json({ error: true, message: "Content is required" });
  }

  try {
    const note = new Note({
      title,
      content,
      userId: user._id,
    });

    await note.save();

    return res.status(200).json({
      error: false,
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// note update API
app.put("/note/update/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, isPinned } = req.body;
  const { user } = req.user;

  if (!title && !content) {
    return res
      .status(400)
      .json({ error: true, message: "No changes were made" });
  }

  try {
    const noteToUpdate = await Note.findOne({ _id: noteId, userId: user._id });

    if (!noteToUpdate) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    if (title) noteToUpdate.title = title;
    if (content) noteToUpdate.content = content;
    if (isPinned) noteToUpdate.isPinned = isPinned;

    await noteToUpdate.save();

    return res.status(200).json({
      error: false,
      message: "Note updated successfully",
      note: noteToUpdate,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

// note delete API
app.delete("/note/delete/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { user } = req.user;

  try {
    const noteToDelete = await Note.findOneAndDelete({
      _id: noteId,
      userId: user._id,
    });

    if (!noteToDelete) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    return res
      .status(200)
      .json({ error: false, message: "Note deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

// get all notes by user ID API
app.get("/note/get-all", authenticateToken, async (req, res) => {
  const { user } = req.user;

  try {
    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });
    return res.status(200).json({ error: false, notes });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

// pin/unpin note API
app.put("/note/toggle-pin/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { isPinned } = req.body;
  const { user } = req.user;

  try {
    const noteToUpdate = await Note.findOne({ _id: noteId, userId: user._id });

    if (!noteToUpdate) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    if (isPinned) noteToUpdate.isPinned = isPinned || false;

    await noteToUpdate.save();

    return res.status(200).json({
      error: false,
      message: "Note updated successfully",
      note: noteToUpdate,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

// starts the server on given port
app.listen(8000);

module.exports = app;
