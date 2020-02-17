const mongoose = require("mongoose");
const { SeatSchema } = require("./seat.models");

const TicketShema = new mongoose.Schema({
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tríp"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  seats: [SeatSchema],
  totalPrice: Number
});

const Tickets = mongoose.model("Tickets", TicketShema, "Tickets");
module.exports = {
  TicketShema,
  Tickets
};
