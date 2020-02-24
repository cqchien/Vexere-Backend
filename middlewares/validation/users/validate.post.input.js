const lodash = require("lodash");
const validator = require("validator");

const {Users} = require("../../../models/user.models");

module.exports.validatePostInput = async (req, res, next) => {
  let error = {};
  if (_.isEmpty(error)) {
    return next();
  }
  
}

