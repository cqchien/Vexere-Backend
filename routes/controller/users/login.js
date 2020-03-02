const { Users } = require("../../../models/user.models");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../../../config/index");
const { promisify } = require("util");
const _ = require("lodash");

const comparePassword = promisify(bcrypt.compare);
const jwtSign = promisify(jwt.sign);

module.exports.login = async (req, res, next) => {
  try {
    let { Email, password } = req.body;
    let _user;
    Users.findOne({ Email })
      .then((user) => {
        if (!user) {
          return Promise.reject({
            status: 400,
            message: "Email does not exist"
          });
        }
        _user = user;
        return comparePassword(password, user.password);
        // return Promise.all([comparePassword(password, user.password), user]);
      })
      .then((isMatched) => {
        // let isMatched = result[0];
        // let user = result[1];

        if (!isMatched) {
          return Promise.reject({
            status: 400,
            message: "Password is incorrect"
          });
        }
        const payload = _.pick(_user, ["Email", "fullname", "userType", "_id"]);
        return jwtSign(payload, `${secretKey}`, { expiresIn: 3600 });
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
