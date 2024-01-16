const express = require("express");
const router = express.Router();
const loginController = require("../controllers/LoginController");

router.route("/").post(loginController.Login);

router.route("/status").post(loginController.status);

module.exports = router;
