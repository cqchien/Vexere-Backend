const express = require("express");
const router = express.Router();

const { createUser, getUser, getUserById, updateUserByAdmin, updateUserByClient, deleteById, updatePassword } = require("./users");
const { authenticate } = require("../../../middlewares/auth.middlewares");
const { testPrivate } = require("../../../middlewares/testPrivate.middleware");
const { authorize } = require("../../../middlewares/authorize.middleware");
const { uploadImage } = require("../../../middlewares/uploadImage.middleware");
const { validatePostInput} =  require("../../../middlewares/validation/users/validate.post.input");
const {validateUpdatePassword} = require("../../../middlewares/validation/users/validate.updatePassword");
const {login} = require("./login");
const {uploadAvatar} = require("./uploadAvatar");

router.get("/", getUser);
router.get("/:userId", getUserById);

router.put("/:userId", authenticate, authorize(["admin"]), updateUserByAdmin );
router.put("/me", authenticate, authorize(["client"]), updateUserByClient );
router.post("/avatar", authenticate, uploadImage("avatar"), uploadAvatar );
router.delete("/:userId", authenticate, authorize(["admin"]), deleteById );

router.post("/", authenticate, authorize(["admin"]), validatePostInput, createUser);
router.post("/updatePassword", authenticate, validateUpdatePassword, updatePassword);
router.post("/login", login);
router.post("/private", authenticate, authorize(["client"]), testPrivate);

module.exports = router;
