const express = require("express");
const {authenticate, upload} = require("../../middlewares");

const router = express.Router();

const {
    signup,
    login,
    currentUser,
    logout,
    avatars
  } = require("../../controllers/users");

router.post("/signup", signup);

router.post("/login", login);

router.get("/current", authenticate, currentUser);

router.get("/logout", authenticate, logout);

router.patch("/avatars", authenticate, upload.single("avatar"), avatars);

module.exports = router; 