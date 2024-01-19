const mysql2 = require("mysql2");

const db = mysql2.createConnection({
  //needs to be fixed!
  host: "localhost",
  user: "root",
  password: "password",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = db;
