const socketIo = require("socket.io");
const userModel = require("./models/userModel");
const captainModel = require("./models/captainModel");

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  console.log("Socket.io initialized");

  io.on("connection", (socket) => {
    // console.log("Socket connected:", socket.id);

    socket.on("join", async (data) => {
      const { userId, userType } = data;

      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
        // console.log(`User ${userId} joined with socket ID: ${socket.id}`);
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
        // console.log(`Captain ${userId} joined with socket ID: ${socket.id}`);
      }
    });

    socket.on('update-location-captain', async (data) => {
      const { userId, location } = data;

      if (!location || !location.ltd || !location.lng) {
        socket.emit("error", { message: "Invalid location parameters" })
      }

      await captainModel.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lng: location.lng
        }
      });

    })

    socket.on("disconnect", () => {
      // console.log("Socket disconnected:", socket.id);
    });
  });
}

function sendMessageToSocketId(socketId, event, data) {
  if (io && socketId) {
    io.to(socketId).emit(event, data);
  } else {
    console.error("Socket.io not initialized or invalid socketId");
  }
}

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
