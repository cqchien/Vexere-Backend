const { Users } = require("../../../models/user.models");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const comparePassword = promisify(bcrypt.compare);
const jwtSign = promisify(jwt.sign);

const createUser = async (req, res, next) => {
  try {
    let user = await Users.findOne({ Email: req.body.Email });
    if (user) {
      return res.status(400).json({ message: "Email is existed" });
    }

    let newUser = await Users.create(req.body);
    return res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res, next) => {
  try {
    let { Email, password } = req.body;
    await Users.findOne({ Email: Email })
      .then((user) => {
        if (!user) {
          return Promise.reject({
            status: 400,
            message: "Email does not exist"
          });
        }
        return Promise.all([comparePassword(password, user.password), user]);
      })
      .then((result) => {
        console.log(result);
        let isMatched = result[0];
        let user = result[1];

        if (!isMatched) {
          return Promise.reject({
            status: 400,
            message: "Password is incorrect"
          });
        }
        const payload = {
          Email: user.Email,
          userType: user.userType
        };
        return jwtSign(payload, "CyberSoft", { expiresIn: 3600 });
      })
      .then((token) => {
        return res.status(200).json({ message: "Login successfully", token });
      });
  } catch (error) {
    if (!error.status) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
    return res.status(error.status).json(error.message);
  }
};

const uploadAvatar = async (req, res, next) => {
  try {
    let { Email } = req.user;
    Users.findOne({ Email })
      .then((user) => {
        if (!user)
          return res.status(404).json({ message: "User is not exist" });
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

module.exports = {
  createUser,
  login,
  uploadAvatar
};
