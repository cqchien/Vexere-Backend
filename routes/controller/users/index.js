const express = require("express");
const router = express.Router();

const { createUser, login, uploadAvatar } = require("./users");
const { authenticate } = require("../../../middlewares/auth.middlewares");
const { testPrivate } = require("../../../middlewares/testPrivate.middleware");
const { authorize } = require("../../../middlewares/authorize.middleware");
const { uploadImage } = require("../../../middlewares/uploadImage.middleware");

router.post("/", createUser);
router.post("/login", login);
router.post("/private", authenticate, authorize(["client"]), testPrivate);
router.patch(
  "/avatar",
  authenticate,
  authorize(["client", "admin"]),
  uploadImage("avatar"),
  uploadAvatar
);

module.exports = router;
