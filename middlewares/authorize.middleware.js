module.exports.authorize = (userType) => {
  return (req, res, next) => {
    const index = userType.findIndex((ele) => ele === req.user.userType);
    if (index > -1) {
      return next();
    }
    return res.status(403).json({ message: "You dont have permission" });
  };
};
