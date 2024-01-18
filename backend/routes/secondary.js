const express = require("express");
const router = express.Router();
const db = require("../config/sqlConfig");

router.route("/").get((req, res) => {
  const { table } = req?.query;

  const query = `SELECT * FROM ${table}`;
  db.query(query, (err, data) => {
    if (err) throw err;
    res.json(data).status(200);
  });
});
