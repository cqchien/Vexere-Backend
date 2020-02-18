const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // to hash password
const { promisify } = require("util"); // transform callback to promsie

const genSalt = promisify(bcrypt.genSalt);
const hash = promisify(bcrypt.hash);

const UserShema = new mongoose.Schema({
  Email: String,
  password: String,
  fullname: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true
  },
  userType: {
    enum: ["admin", "client", "anonymous"]
  }
});

// hash middleware

UserShema.pre("save", function save(next) {
  const user = this;
  console.log("user:", user);
  if (!user.isModified("password")) return next();

  genSalt()
    .then((salt) => hash(user.password, salt))
    .then((hash) => {
      user.password = hash;
      next();
    })
    .catch((err) => next(err));
});

const Users = mongoose.model("Users", UserShema, "Users");

module.exports = {
  UserShema,
  Users
};
