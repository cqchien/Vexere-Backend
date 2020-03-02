const express = require("express");
const router = express.Router();
const { authenticate } = require("../../../middlewares/auth.middlewares");
const {
  createStation,
  getStation,
  getStationById,
  updateStationById,
  deleteStationById,
  replaceStationById
} = require("./stations");

router.get("/", getStation);
router.get("/:stationId", getStationById);

router.post("/", authenticate, createStation);

router.put("/:stationId", authenticate, replaceStationById);
router.patch("/:stationId", authenticate, updateStationById);
router.delete("/:stationId", authenticate, deleteStationById);

module.exports = router;
