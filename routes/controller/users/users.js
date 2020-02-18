const { Users } = require("../../../models/user.models");

const createUser = async (req, res, next) => {
  try {
    let newUser = await Users.create(req.body);
    return res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createUser
};
