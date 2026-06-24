const jwt = require("jsonwebtoken");

function generateAccessTokne(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
}
function generateRefreshTokne(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
}

module.exports = {
  generateAccessTokne,
  generateRefreshTokne,
};
