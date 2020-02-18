const { Stations } = require("../../../models/station.models");

const createStation = async (req, res, next) => {
  try {
    let newStation = await Stations.create(req.body);
    return res.status(201).json(newStation);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getStation = async (req, res, next) => {
  try {
    let station = await Stations.find();
    return res.status(200).json(station);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getStationById = async (req, res, next) => {
  try {
    let { stationId } = req.params;
    let station = await Stations.findOne({ _id: stationId });
    return res.status(200).json(station);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateStationById = async (req, res, next) => {
  try {
    let { stationId } = req.params;
    let { name, address, province } = req.body;
    Stations.findOne({ _id: stationId })
      .then((station) => {
        if (!station) {
          return Promise.reject({
            status: 404,
            message: "Station not found"
          });
        }
        station.name = name;
        station.address = address;
        station.province = province;
        return station.save();
      })
      .then((station) => res.status(200).json(station));
  } catch (error) {
    if (!error.status) return res.status(500).json(error);
    return res.status(error.status).json(error.message);
  }
};

const deleteStationById = async (req, res, next) => {
  try {
    let { stationId } = req.params;
    await Stations.deleteOne({ _id: stationId });
    return res.status(204).json("Delete succesfuly");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createStation,
  getStation,
  getStationById,
  updateStationById,
  deleteStationById
};
