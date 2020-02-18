const express = require("express");
const router = express.Router();

const { createUser } = require("./users");

router.post("/", createUser);

module.exports = router;
