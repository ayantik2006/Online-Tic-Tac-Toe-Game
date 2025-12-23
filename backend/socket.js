const { Server } = require("socket.io");

function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    socket.on("join room", (data) => {
      const roomsData = [];
      const roomsName = [];

      for (let [roomName, sockets] of io.sockets.adapter.rooms) {
        if (!io.sockets.sockets.get(roomName)) {
          roomsData.push({
            roomName,
            users: sockets.size,
          });
          roomsName.push(roomName);
        }
      }

      if (!roomsName.includes(data.roomName)) {
        socket.emit("incorrect room id", {
          msg: "No room exists with this ID!",
        });
        return;
      }

      const roomName = data.roomName;

      for (let room of roomsData) {
        if (room.roomName === roomName && room.users == 2) {
          socket.emit("room full", {
            msg: "This room already has 2 players!",
          });
          return;
        }
      }
      socket.data.name = data.name + " (O)";
      socket.join(roomName);

      const room = io.sockets.adapter.rooms.get(roomName);
      if (!room) return [];
      let players = [];
      [...room].map((val) => {
        players.push(io.sockets.sockets.get(val).data.name);
      });
      const player1 = players[0];
      const player2 = players[1];

      io.to(roomName).emit("room joined", {
        name: data.name,
        roomName: roomName,
        player1: player1,
        player2: player2,
        symbol: "O",
      });
    });

    socket.on("create room", (data) => {
      const roomName = data.roomName;
      if (!socket.data.name) {
        socket.data.name = data.name + " (X)";
        socket.join(roomName);
      }

      const room = io.sockets.adapter.rooms.get(roomName);
      if (!room) return [];
      let players = [];
      [...room].map((val) => {
        players.push(io.sockets.sockets.get(val).data.name);
      });
      const player1 = players[0];
      const player2 = players[1];

      io.to(roomName).emit("room joined", {
        name: data.name,
        player1: player1,
        player2: player2,
        roomName:roomName,
      });
    });

    socket.on("player moved",(data)=>{
      io.to(data.roomName).emit("player moved",data);
    });
  });
  return { io: io };
}

module.exports = { initSocket };
