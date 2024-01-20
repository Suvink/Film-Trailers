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
const passport = require("passport");

// When importing these dependancies, first import the stuff from packages. Then import the things from local files.
// It's not a rule but a best practice we use commonly.


// Lets create a separate directory called middleware and put all the middleware functions there.
function midLog(req, res, next) { // Res is not used so let's remove that.
  // Now if you need a logger util, you can use Chalk (https://www.npmjs.com/package/chalk) to pretty print these.
  // The best practise is that you have different levels of logs. Example: Info, Error, Debug, Warn etc.
  // Use color codes for each level. Example: Info - Green, Error - Red, Debug - Yellow, Warn - Orange etc.
  // Also add an environment variable to set the log level and another one to enable/disable logs. Eg: LOG_LEVEL=DEBUG, ENABLE_LOGS=true
  console.log(
    `Request coming from ${req.url} \nMethod-> ${
      req.method
    }\nCookies -> ${JSON.stringify(req.cookie)}\nSession -> ${JSON.stringify(
      req.session
    )}\n${req.headers.cookie}`
  );
  next();
}

app.use(express.json({ limit: "50mb" })); // Lets move these constants to a separate file.
app.use(cookieParser());
app.use(cors({ origin: "*" })); // allow access from anywhere for now lol
if (!fs.existsSync(join(__dirname, "public"))) {
  fs.mkdirSync(join(__dirname, "public"));
}

app.use(helmet({}));
app.use(compression({ filter: false }));
app.use(express.static(join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

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
  morgan("combined", { // You can combine this with Chalk and have a good logger util.
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);
// app.use(
//   passport((err, data) => {
//     if (err) throw err;
//     console.log("Will be used for OAuth!");
//   })
// );
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
  // Since you're writing an API, shall we just send a 404 response instead of sending a HTML file?
});

const admin = express();
admin.use(express.json({ limit: "50mb" }));
admin.use(cors());
admin.use("/main", adminMain);

async function connectDB() {
  await mongoose.connect(
    cluster,
    { useNewUrlParser: true, useUnifiedTopology: true }, // added useUnifiedTopology
    console.log(`Connected to Cluster!`) // Let's move these logs to a logger util.
  );
}

async function adminBoot() { // Why do we use an async function here?
  admin.listen(8001, () => {
    connectDB();
    console.log(`Admin up on port ${8001}`);
  });
}

adminBoot();

async function clientBoot() { // Why do we use an async function here?
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
const { Server } = require("socket.io"); // Let's move these to the very top of the file

const server = express();  // IMO it's better to separate the socket server from the express server.

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
