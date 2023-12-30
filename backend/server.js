const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const cluster = process.env.CLUSTER;
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const mongoose = require("mongoose");
const homepage = require("./routes/home");
const { join } = require("path");
const fs = require("fs");
const register = require("./routes/users");
const login = require("./routes/login");
const gemini = require("./routes/gemini");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const linked = require("./routes/linked");
const cart = require("./routes/cart");
// const { Server } = require("socket.io");
// const io = new Server(app, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors()); //allow access from anywhere for now lol
if (!fs.existsSync(join(__dirname, "public"))) {
  fs.mkdirSync(join(__dirname, "public"));
}

app.use(helmet());
app.use(compression({}));
app.use(express.static(join(__dirname, "public")));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/home", homepage);
app.use("/links", linked);
app.use("/register", register);
app.use("/login", login);
app.use("/gemini", gemini);
app.use("/cart", cart);

// io.on("connection", (socket) => { //im trying to implement a chat type feature
//   console.log(socket.id);

//   socket.on("receive message", (data) => {
//     socket.emit("chat message", data);
//   });
// });

app.use("*", (req, res) => {
  //last resort incase user is trying to access some unknown path
  res.sendFile(join(__dirname, "./views/404", "404.html"));
});

async function start() {
  try {
    await mongoose.connect(cluster, { useNewUrlParser: true });

    app.listen(port, console.log(`Servers up on port ${port}`));
  } catch (err) {
    console.error(err);
  }
}

start();
