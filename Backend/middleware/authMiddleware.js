const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access denied, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
