const express = require("express");
const { createServer } = require("http"); // Import createServer from http module
const { Server } = require("socket.io");
const cors = require("cors");
const server = express();

server.use(cors());
server.use(express.json());

const httpServer = createServer(server); // Pass 'server' to createServer
const io = new Server(httpServer);

io.on("connect", (socket) => {
  socket.on("message", (data) => {
    console.log(data);
    io.broadcast.emit("message", data);
    console.log(data);
  });

  socket.on("remove", (data) => {
    io.emit("remove", data);
  });
});

httpServer.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
