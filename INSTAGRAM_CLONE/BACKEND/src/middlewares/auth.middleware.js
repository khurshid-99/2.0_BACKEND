const jwt = require("jsonwebtoken");

async function identifyUser(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized Access",
    });
  }
  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(403).json({
      message: "Forbidden Invalid token",
      error: error,
    });
  }

  req.user = decoded;
  next();
}


module.exports = identifyUser;