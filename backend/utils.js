const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // extracts token from authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // checks if token is present
  if (!token) return res.sendStatus(401);

  // verifies the token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(401);
    req.user = user;
    next();
  });
};

module.exports = {
  authenticateToken,
};

// todo - study this code