const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.route("/").get(userController.GetUsers).post(userController.CreateUser);

module.exports = router;
