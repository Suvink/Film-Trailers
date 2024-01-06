const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.cookie("hello", "world", { maxAge: 60000 * 60 });
  res.status(200).send(`Testing the get test route with a ${req.method}`);
});

module.exports = router;
