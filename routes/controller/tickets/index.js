const express = require("express");
const router = express.Router();
const { authenticate } = require("../../../middlewares/auth.middlewares");
const { authorize } = require("../../../middlewares/authorize.middleware");
const { createTicket } = require("./tickets");

router.post("/", authenticate, authorize(["client"]), createTicket);

module.exports = router;
