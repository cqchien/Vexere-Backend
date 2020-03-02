const _ = require("lodash");
const validator = require("validator");

const { Users } = require("../../../models/user.models");
module.exports.validateUpdatePassword = async (req, res, next) => {
  let errors = {};

  const password = _.get(req.body, "password", "");
  const password2 = _.get(req.body, "password2", "");

  // Validate password
  if (validator.isEmpty(password)) {
    errors.password = "Password is required";
   } 
  else if (!validator.isLength(password, { min: 8 })) {
    errors.password = "Password has at least 8 characters";
  }
  // Confirm password
  if (validator.isEmpty(password2)) {
    errors.password2 = "Confirm password is required";
  } else if (!validator.equals(password, password2)) {
    errors.password2 = "Password is match";

  }

  if (_.isEmpty(errors)) {
    return next();
  }
  return res.status(400).json(errors);
};
