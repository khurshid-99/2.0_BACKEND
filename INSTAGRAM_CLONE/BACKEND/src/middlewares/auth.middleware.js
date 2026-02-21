const jwt = require("jsonwebtoken");

async function identifyUser(req, res, next) {
  const { token } = req.cookies;

  /**
   * @VERIFY : Check Token Expiration and Handle Refresh Logic
   */
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized Access",
    });
  }
  let decoded = null;

  /**
   * @VERIFY : Validation of JWT Signature using process.env.JWT_SECRET
   */
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
