const mysql2 = require("mysql2");

const db = mysql2.createConnection({
  host: "localhost", // Let's move these to an env variable
  user: "root",
  password: "password",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected!"); //  Let's add a logger util here.
});

module.exports = db;
