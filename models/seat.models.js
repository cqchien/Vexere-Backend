const mongoose = require("mongoose");

const SeatSchema = new mongoose.Schema({
  code: {
    type: String,
    require: true
  },
  isBooked: {
    type: Boolean,
    default: false
  }
});

const Seats = mongoose.model("Seats", SeatSchema, "Seats");
module.exports = {
  SeatSchema,
  Seats
};
