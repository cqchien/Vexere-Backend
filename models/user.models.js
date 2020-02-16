const mongoose = require("mongoose");

const UserShema = new mongoose.Schema({
  Email: String,
  passwork: String,
  fullname: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true
  },
  userType: [
    {
      enum: [admin, client, anonymous],
      require: true
    }
  ]
});

const Users = mongoose.model("Users", UserShema, "Users");
module.exports = {
  UserShema,
  User
};
