const jwt = require("jsonwebtoken");
const checkLogin = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);

  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, dulal);
    const { email, userId } = decoded;
    req.email = email;
    req.userId = userId;
    next();
  } catch (err) {
    next({ message: err.message });
  }
};

module.exports = checkLogin;
