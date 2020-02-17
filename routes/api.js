const express = require("express");
const router = express.Router();

const stationsRouter = require("./controller/stations/index");

router.use("/stations", stationsRouter);

module.exports = router;
