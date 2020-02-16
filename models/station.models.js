const mongoose = require("mongoose");

const StationShema = new mongoose.Schema({
  name: {
    type: String,
    requrie: true
  },
  address: {
    type: String,
    require: true
  },
  province: {
    type: true,
    require: true
  }
});

const Stations = mongoose.model("Stations", StationShema, "Stations");
module.exports = {
  StationShema,
  Stations
};
