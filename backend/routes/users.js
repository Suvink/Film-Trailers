const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const Axios = require("axios");
const apiKey = "";

router.route("/").get(userController.GetUsers).post(userController.CreateUser);

router.route("/:id").delete(userController.deleteUser);

router.route("/forgot").post(userController.updatePassword);

router.get("/arg").get(async (req, res) => {
  const { arg } = req?.body;

  try {
    const response = await Axios.get(
      `https://api.api-ninjas.com/v1/animals?name=${String(arg)}`,
      {
        headers: {
          "X-Api-Key": apiKey,
        },
      }
    );
    return res.status(200).json(response);
  } catch (e) {
    console.log(e.error);
  }
});

module.exports = router;
