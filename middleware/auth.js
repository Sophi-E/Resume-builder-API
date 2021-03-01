const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  //check token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization failed" });
  }

  //verify token
  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
