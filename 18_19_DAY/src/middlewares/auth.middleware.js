const jwt = require("jsonwebtoken");
async function userIdentify(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized: Access token not found.",
    });
  }

  let decode = null;
  try {
    // Verification
    decode = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    // Handling expired or tampered tokens
    return res.status(403).json({
      message: "Forbidden Unauthorized token",
    });
  }

  // Changed: Use 'req.user' so the next middleware can access it.
  res.user = decode;
  next();
}

module.exports = userIdentify;
