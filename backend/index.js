// loads .env file into process.env
require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

// establishes a connection to the database
mongoose.connect(config.connectionString);

const User = require("./models/user.model");

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
app.post("/create", async (req, res) => {
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

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    return res
      .status(409)
      .json({ error: true, message: "User already exists" });
  }

  const user = new User({
    username: username,
    email: email,
    password: password,
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
});

// user login API
app.post("/login", async (req, res) => {
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
    const user = { email: foundUser.email };
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
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

// notes create API
app.post("/create", (req, res) => {
  // todo: create add notes API
  // todo: resolve "/create" conflict between user and notes
});

// starts the server on given port
app.listen(8000);

module.exports = app;
