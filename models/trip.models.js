const mongoose = require("mongoose");
const { SeatSchema } = require("./seat.models");

const TripShema = new mongoose.Schema({
  fromStation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stations"
  },
  toStation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stations"
  },
  startTime: {
    type: String,
    require: true
  },
  seats: [SeatSchema],
  price: Number
});

const Trips = mongoose.model("Trips", TripShema, "Trips");
module.exports = {
  TripShema,
  Trips
};
