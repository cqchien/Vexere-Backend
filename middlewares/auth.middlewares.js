const { jwtVerify } = require("../helper/callbackToPromise.helper");

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
      return res.status(500).json(error);
    });
};
