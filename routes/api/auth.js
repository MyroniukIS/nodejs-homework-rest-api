const express = require("express");
const {authenticate} = require("../../middlewares");

const router = express.Router();

const {
    signup,
    login,
    currentUser,
    logout,
  } = require("../../controllers/users");

router.post("/signup", signup);

router.post("/login", login);

router.get("/current", authenticate, currentUser);

router.get("/logout", authenticate, logout);

module.exports = router; 