const bcrypt = require("bcrypt");
const saltRounds = 10;

// hashes password when
// registering a new user
const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Password hashing failed: ", error);
  }
};

// compares entered password
// with the one from database
const verifyPassword = async (password, hashedPassword) => {
  try {
    const isMatching = await bcrypt.compare(password, hashedPassword);
    return isMatching;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { hashPassword, verifyPassword };
