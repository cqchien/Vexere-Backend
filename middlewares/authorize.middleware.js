module.exports.authorize = (userType) => {
  return (req, res, next) => {
    if (
      userType.findIndex((ele) => {
        ele === req.user.userType > -1;
      })
    )
      return next();
    return res.status(403).json({ message: "You dont have permission" });
  };
};
