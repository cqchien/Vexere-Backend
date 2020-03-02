const { Trips } = require("../../../models/trip.models");
const { Tickets } = require("../../../models/ticket.models");
const { Seats } = require("../../../models/seat.models");
const { sendEmail } = require("../../../services/sendEmail/bookTicket");
const _ = require("lodash");

const createTicket = async (req, res, next) => {
  try {
    let userId = req.user._id;
    let { tripId, seatCodes } = req.body;
    Trips.findOne({ _id: tripId })
      .populate("fromStation")
      .populate("toStation")
      .then((trip) => {
        if (!trip) {
          return Promise.reject({ message: "Trip was not found" });
        }
        const availableSeatCodes = trip.seats
          .filter((seat) => seat.isBooked == false)
          .map((s) => s.code);
        console.log(availableSeatCodes);
        let errSeatCode = seatCodes.filter((seat) => {
          return availableSeatCodes.indexOf(seat) === -1;
        });
        if (!_.isEmpty(errSeatCode)) {
          return res.status(400).json({
            message: `Seat(s) ${errSeatCode.join("; ")} are already booked`,
            errSeatCode: errSeatCode
          });
        }
        const newTicket = new Tickets({
          tripId,
          userId,
          seats: seatCodes.map((code) => new Seats({ code, isBooked: true })),
          totalPrice: trip.price * seatCodes.length
        });

        seatCodes.forEach((code) => {
          const index = trip.seats.findIndex((s) => s.code === code);
          trip.seats[index].isBooked = true;
        });
        return Promise.all([newTicket.save(), trip.save()]);
      })
      .then((result) => {
        sendEmail(result[1], req.user, result[1]);
        return res.status(200).json(result[0]);
      });
  } catch (error) {
    if (!error.status) return res.status(500).json({ error });
    return res.status(error.status).json(error);
  }
};

module.exports = {
  createTicket
};
