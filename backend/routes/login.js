const express = require("express");
const router = express.Router();
const loginController = require("../controllers/LoginController");

router.route("/").post(loginController.Login);

module.exports = router;
