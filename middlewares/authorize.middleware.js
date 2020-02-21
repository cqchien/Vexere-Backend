module.exports.authorize = (userType) => {
  return (req, res, next) => {
    console.log(userType, req.user.userType);
    if (userType.findIndex((ele) => ele === req.user.userType) > -1) {
      console.log(userType, req.user.userType);
      return next();
    }
    return res.status(403).json({ message: "You dont have permission" });
  };
};
