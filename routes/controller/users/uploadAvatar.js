const { Users } = require("../../../models/user.models");

module.exports.uploadAvatar = async (req, res, next) => {
  try {
    let { Email } = req.user;
    Users.findOne({ Email })
      .then((user) => {
        console.log(req.file);
        user.avatar = req.file.path;
        return user.save();
      })
      .then((user) =>
        res.status(200).json({ message: "Upload is successfully", user })
      );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
