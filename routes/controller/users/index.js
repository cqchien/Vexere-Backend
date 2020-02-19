const express = require("express");
const router = express.Router();

const { createUser, login } = require("./users");
const { authenticate } = require("../../../middlewares/auth.middlewares");
const { testPrivate } = require("../../../middlewares/testPrivate.middleware");
const { authorize } = require("../../../middlewares/authorize.middleware");

router.post("/", createUser);
router.post("/login", login);
router.post("/private", authenticate, authorize(["client"]), testPrivate);

module.exports = router;
