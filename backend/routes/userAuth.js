const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res
      .sendStatus(401)
      .json({ message: "Authentication Token Expired!!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .sendStatus(403)
        .json({ message: "Token Expired. Please Signin Again!!" });
    }
    req.user = user;
    next();
  });
};

module.exports = {authenticateToken};
