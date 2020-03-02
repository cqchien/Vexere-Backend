const _ = require("lodash");
const validator = require("validator");

const { Users } = require("../../../models/user.models");
//! Validate when create user
//? _.isEmpty() =>  use for Arr and Object;
//? validator.isEmpty() =>  use for String;
module.exports.validatePostInput = async (req, res, next) => {
  let errors = {};
  // Object.keys(req.body).map((key) => {
  //   const key = _.get(req.body, `${key}`, " ");
  // });
  const Email = _.get(req.body, "Email", "");
  const password = _.get(req.body, "password", "");
  const password2 = _.get(req.body, "password2", "");
  const fullname = _.get(req.body, "fullname", "");
  const userType = _.get(req.body, "userType", "");
  // Validate Email
  if (validator.isEmpty(Email)) {
    errors.Email = "Email is required";
  } else {
    let user = await Users.findOne({ Email });
    if (user) {
      errors.Email = "Email is exist";
    } else if (!validator.isEmail(Email)) {
      errors.Email = "Email is invalid";
    }
  }
  // Validate password
  if (validator.isEmpty(password)) {
    errors.password = "Password is required";
  } else if (!validator.isLength(password, { min: 8 })) {
    errors.password = "Password has at least 8 characters";
  }
  // Confirm password
  if (validator.isEmpty(password2)) {
    errors.password2 = "Confirm password is required";
  } else if (!validator.equals(password, password2)) {
    errors.password2 = "Password is match";

  }
  // Fullname and userType
  if (validator.isEmpty(fullname)) {
    errors.fullname = "Fullname is required";
  }

  if (validator.isEmpty(userType)) {
    errors.userType = "User type password is required";
  } else if (
    !validator.equals(userType, "admin") &&
    !validator.equals(userType, "client")
  ) {
    errors.password2 = "User type is invalid";
  }

  if (_.isEmpty(errors)) {
    return next();
  }
  return res.status(400).json(errors);
};
