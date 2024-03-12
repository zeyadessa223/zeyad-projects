const blacklistedTokens = new Set();

const jwt = require("jsonwebtoken");
require("dotenv").config();
const validateToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authorizationHeader.split(" ")[1];
  if (blacklistedTokens.has(token)) {
    return res.status(401).json({ message: "Token is blacklisted" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.userId = decoded.userId;
    next();
  });
};

module.exports = validateToken;
