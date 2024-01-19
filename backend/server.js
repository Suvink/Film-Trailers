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
const morgan = require("morgan");
const fs = require("fs");
const register = require("./routes/users");
const login = require("./routes/login");
const gemini = require("./routes/gemini");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const linked = require("./routes/linked");
const cart = require("./routes/cart");
const adminMain = require("./routes/admin/adminMain");
const limiter = require("./limiter");
const session = require("express-session");

function midLog(req, res, next) {
  console.log("Testing!");
  next();
}

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*" })); // allow access from anywhere for now lol
if (!fs.existsSync(join(__dirname, "public"))) {
  fs.mkdirSync(join(__dirname, "public"));
}

app.use(helmet({}));
app.use(compression({}));
app.use(express.static(join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use("*", (req, res, next) => {
  console.log(JSON.stringify(req.session));
  console.log(JSON.stringify(req.cookies));
  next();
});
app.use(
  session({
    secret: "testing123",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 10000,
      secure: true,
      httpOnly: true,
      domain: "*",
      path: "foo/bar",
      expires: 60000, //1 hour in ms
    },
  })
);

app.use(
  morgan("combined", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);

app.use(midLog);
app.use("/home", homepage);
app.use("/register", register);
app.use("/links", linked);
app.use("/login", login);
app.use("/gemini", gemini);
app.use("/cart", cart);

app.use("*", (req, res) => {
  // last resort in case user is trying to access some unknown path
  res.sendFile(join(__dirname, "./views/404", "404.html"));
});

const admin = express();
admin.use(express.json({ limit: "50mb" }));
admin.use(cors());
admin.use("/main", adminMain);

async function connectDB() {
  await mongoose.connect(
    cluster,
    { useNewUrlParser: true, useUnifiedTopology: true }, // added useUnifiedTopology
    console.log(`Connected to Cluster!`)
  );
}

async function adminBoot() {
  admin.listen(8001, () => {
    connectDB();
    console.log(`Admin up on port ${8001}`);
  });
}

adminBoot();

async function clientBoot() {
  try {
    app.listen(port, () => {
      connectDB();
      console.log(`Client is up on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

clientBoot();

const { createServer } = require("http");
const { Server } = require("socket.io");
const server = express();

server.use(cors());
server.use(express.json());

const httpServer = createServer(server);
const io = new Server(httpServer);

try {
  io.on("connect", (socket) => {
    socket.on("message", (data) => {
      io.emit("message", data);
      console.log(data);
    });

    socket.on("remove", (data) => {
      io.emit("remove", data);
    });
  });
} catch (err) {
  console.error(err);
} finally {
  console.log("Disconnect!");
}

httpServer.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
