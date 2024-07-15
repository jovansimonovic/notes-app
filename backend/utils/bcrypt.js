const bcrypt = require("bcrypt");

// hashes password when
// registering a new user
const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

// compares entered password
// with the one from database
const verifyPassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = { hashPassword, verifyPassword };
