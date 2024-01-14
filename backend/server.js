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
const rateLimit = require("./limiter");

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*" })); //allow access from anywhere for now lol
if (!fs.existsSync(join(__dirname, "public"))) {
  fs.mkdirSync(join(__dirname, "public"));
}

app.use(helmet());
app.use(compression({}));
app.use(express.static(join(__dirname, "public")));
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("*", (req, res, next) => {
  console.log(req.session);
  next();
});
app.use("/home", homepage);
app.use("/register", register);
app.use("/links", linked);
app.use("/login", login);
app.use("/gemini", gemini);
app.use("/cart", cart);

app.use("*", (req, res) => {
  //last resort incase user is trying to access some unknown path
  res.sendFile(join(__dirname, "./views/404", "404.html"));
});

const admin = express();
admin.use(express.json({ limit: "50mb" }));
admin.use(cors());
admin.use("/main", adminMain);

async function connectDB() {
  await mongoose.connect(
    cluster,
    { useNewUrlParser: true },
    console.log(`Connected to Cluster!`)
  );
}

async function adminBoot() {
  admin.listen(8001, connectDB(), console.log(`Admin up on port ${8001}`));
}

adminBoot();

async function clientBoot() {
  try {
    app.listen(port, () => {
      connectDB(), console.log(`Client is up on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

clientBoot();
