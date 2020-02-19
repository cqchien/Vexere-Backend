const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const jwtVerify = promisify(jwt.verify);

module.exports.authenticate = async (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    return res
      .status(400)
      .json({ message: "Acsess denied, no token provided" });
  }
  jwtVerify(token, "CyberSoft")
    .then((decode) => {
      console.log(decode);
      req.user = decode;
      next();
    })
    .catch((error) => {
      res.status(500).json(error);
      next();
    });
};
