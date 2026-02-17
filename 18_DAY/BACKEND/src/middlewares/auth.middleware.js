const jwt = require("jsonwebtoken");

async function identifyUser(req, res, next) {
  const { token } = req.cookies;

  // console.log(token);

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized token not found",
    });
  }

  let decoded = null;
  try {
    decoded = await jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    res.status(401).json({
      message: "Unouthrized tokne",
    });
  }

  req.user = decoded;
  next();
}

module.exports = identifyUser;
