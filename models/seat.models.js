const mongoose = require("mongoose");

const SeatShema = new mongoose.Schema({
  code: {
    type: String,
    require: true
  },
  isbooked: {
    type: Boolean,
    default: false
  }
});

const Seats = mongoose.model("Seats", SeatShema, "Seats");
module.exports = {
  SeatShema,
  Seats
};
