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
const adminMain = require("./routes/admin/adminMain");
// const { Socket } = require("socket.io");
// const test = require("./routes/test");
// const firebaseHome = require("./routes/fireMain");

// const { Server } = require("socket.io");
// const io = new Server(app, { cors: { origin: "*" } });

app.use(express.json());
app.use(cookieParser());
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
// app.use("/fire", firebaseHome);
// app.use("/test", test);

app.use("*", (req, res) => {
  //last resort incase user is trying to access some unknown path
  res.sendFile(join(__dirname, "./views/404", "404.html"));
});

app.use("/unit", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ Alert: "No username or password found" });
});

const admin = express();
admin.use(express.json());
admin.use(cors());
admin.use("/main", adminMain);

async function adminBoot() {
  admin.listen(
    8001,
    await mongoose.connect(process.env.CLUSTER2, { useNewUrlParser: true }),
    console.log(`Admin up on port ${8001}`)
  );
}

adminBoot();

async function start() {
  try {
    await mongoose.connect(cluster, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully");

    app.listen(port, () => {
      console.log(`Server is up on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

start();
