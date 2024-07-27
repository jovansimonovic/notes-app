const crypto = require("crypto-js");

// generates a random token for reset password request
const generateResetPasswordToken = () => {
  const token = crypto.lib.WordArray.random(32).toString(crypto.enc.Hex);
  return token;
};

module.exports = { generateResetPasswordToken };
