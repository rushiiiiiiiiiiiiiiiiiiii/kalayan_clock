const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.cookies.login_token || req.cookies.tv_token;

  if (!token) return res.status(401).json({ message: "Not logged in" });

  const secret = req.cookies.login_token
    ? "LOGIN_SECRET_KEY"
    : "TV_SECRET_KEY";

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

module.exports = auth;
