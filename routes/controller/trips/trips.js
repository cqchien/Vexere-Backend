const { Trips } = require("../../../models/trip.models");
const { Seats } = require("../../../models/seat.models");

const seatCode = [
  "A01",
  "A02",
  "A03",
  "A04",
  "A05",
  "A06",
  "A07",
  "A08",
  "A09",
  "A10",
  "A11",
  "A12",
  "B01",
  "B02",
  "B03",
  "B04",
  "B05",
  "B06",
  "B07",
  "B08",
  "B09",
  "B10",
  "B11",
  "B12"
];

const createTrip = async (req, res, next) => {
  try {
    const { fromStation, toStation, startTime, price } = req.body;
    let seats = [];
    seatCode.forEach((code) => {
      let seat = new Seats({ code, isBooked: false });
      seats.push(seat);
    });

    let newTrip = await Trips.create({
      fromStation,
      toStation,
      startTime,
      price,
      seats
    });
    return res.status(200).json(newTrip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTrip = async (req, res, next) => {
  try {
    let trip = await Trips.find();
    return res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTripById = async (req, res, next) => {
  try {
    let { tripId } = req.params;
    let trip = await Trips.findOne({ _id: tripId });
    return res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTripById = async (req, res, next) => {
  try {
    let { tripId } = req.params;
    const { fromStation, toStation, startTime, price } = req.body;
    Trips.findOne({ _id: tripId })
      .then((trip) => {
        if (!trip) {
          return Promise.reject({
            status: 404,
            message: "Trip not found"
          });
        }
        trip.fromStation = fromStation;
        trip.toStation = toStation;
        trip.startTime = startTime;
        trip.price = price;

        return trip.save();
      })
      .then((trip) => res.status(200).json(trip));
  } catch (error) {
    if (!error.status) return res.status(500).json(error);
    return res.status(error.status).json({ message: error.message });
  }
};

const deleteTripById = async (req, res, next) => {
  try {
    let { tripId } = req.params;
    await Trips.deleteOne({ _id: tripId });
    return res.status(204).json({ message: "Trip is deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTrip,
  getTrip,
  getTripById,
  updateTripById,
  deleteTripById
};
