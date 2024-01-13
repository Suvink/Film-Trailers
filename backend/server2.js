const {} = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {});

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    socket.emit(data);
    console.log(data);
  });

  socket.on("hollah", (data) => {
    socket.emit(data);
  });
});

httpServer.listen(4000);
