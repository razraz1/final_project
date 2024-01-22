const userController = require("../dal/user.controller");
const jwt = require("jsonwebtoken");

//AUTHENTICATION
async function authentication(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) throw "no headers";
  const refreshToken = auth.split(" ")[1];
  if (!refreshToken) throw "no token";
  const decoded = jwt.verify(refreshToken, process.env.TOKEN_SECRET);
  if (decoded.id) {
    const user = await userController.readOne({ _id: decoded.id });
    req.user = user;
  } else {
    throw "token expired";
  }
  next();
}

module.exports = {
  authentication,
};
