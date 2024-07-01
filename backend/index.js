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
    return res.json({ error: true, message: "User already exists" });
  }

  const user = new User({
    username: username,
    email: email,
    password: password,
  });

  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "User registered successfully",
  });
});

// starts the server on given port
app.listen(8000);

module.exports = app;
