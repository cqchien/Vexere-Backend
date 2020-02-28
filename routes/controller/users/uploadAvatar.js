const { Users } = require("../../../models/user.models");

module.exports.uploadAvatar = async (req, res, next) => {
  try {
    let { _id } = req.user;
    Users.findOne({ _id })
      .then((user) => {
        if (!user) {
          return res.status(404).json({message: "User not found"})
        }
        console.log(req.file);
        let path = req.file.path;
        user.avatar = path.split('\\').join('/');
        return user.save();
      })
      .then((user) =>
        res.status(200).json({ message: "Upload is successfully", user })
      );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
