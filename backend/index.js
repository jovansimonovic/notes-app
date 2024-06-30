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

// the first request
app.get("/", (req, res) => {
  res.json({ data: "Hello World!" });
});

// user create API
app.post("/create", async (req, res) => {
  // extracts username, email and
  // password from the request body
  const { username, email, password } = req.body;

  // checks if username field is not empty
  if (!username) {
    return res
      .status(400)
      .json({ error: true, message: "Username is required" });
  }

  // checks if email field is not empty
  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  // checks if password field is not empty
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  // checks if user already exists
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    return res.json({ error: true, message: "User already exists" });
  }

  // creates a new instance of user
  const user = new User({
    username: username,
    email: email,
    password: password,
  });

  // saves the new user to database
  await user.save();

  // generates a JWT token for the newly
  // created user with 30-minute expiration
  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });

  // returns new user object, access token
  // and success message as JSON response
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
