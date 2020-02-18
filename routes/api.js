const express = require("express");
const router = express.Router();

const stationsRouter = require("./controller/stations/index");
const tripsRouter = require("./controller/trips/index");

router.use("/stations", stationsRouter);
router.use("/trips", tripsRouter);

module.exports = router;
