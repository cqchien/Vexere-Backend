const express = require("express");
const router = express.Router();

const {
  createTrip,
  getTrip,
  getTripById,
  updateTripById,
  deleteTripById
} = require("./Trips");

router.get("/", getTrip);
router.get("/:tripId", getTripById);

router.post("/", createTrip);

router.put("/:tripId", updateTripById);
router.delete("/:tripId", deleteTripById);

module.exports = router;
