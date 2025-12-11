const jwt = require('jsonwebtoken')

function adminAuth(req, res, next) {
  const token = req.cookies.login_token;
  if (!token) return res.status(401).json({ message: "Admin not logged in" });

  jwt.verify(token, "LOGIN_SECRET_KEY", (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Admin token" });
    req.user = user;
    next();
  });
}
module.exports = adminAuth