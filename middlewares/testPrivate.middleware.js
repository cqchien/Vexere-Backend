module.exports.testPrivate = (req, res, next) => {
  return res.status(200).json({ message: "Login successfuly", user: req.user });
};
