const express = require("express");
const cors = require("cors");

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

// starts the server on given port
app.listen(8000);

module.exports = app;
