const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require("path");

const httpServer = createServer();
const io = new Server(httpServer, {});

io.on("connect", (socket) => {
  socket.on("message", (err, data) => {
    if (err) throw err;
    socket.emit(data);
    console.log(data);
  });

  socket.on("remove", (err, data) => {
    if (err) throw err;
    socket.emit(data);
  });
});

httpServer.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
