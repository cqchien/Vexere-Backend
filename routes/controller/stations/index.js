const express = require("express");
const router = express.Router();

const {
  createStation,
  getStation,
  getStationById,
  updateStationById,
  deleteStationById
} = require("./stations");

router.get("/", getStation);
router.get("/:stationId", getStationById);

router.post("/", createStation);

router.put("/:stationId", updateStationById);
router.delete("/:stationId", deleteStationById);

module.exports = router;
