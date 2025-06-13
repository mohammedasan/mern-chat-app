const http = require("http");
const socketIo = require("socket.io");
const express = require("express");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["https://howsapp-38jz.onrender.com"], // your frontend URL
    credentials: true,
  },
});

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log(`User connected: ${userId}`);

  socket.join(userId);

  socket.on("newMessage", (message) => {
    const receiverId = message.receiverId;
    // Send message to receiver's room
    io.to(receiverId).emit("newMessage", message);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${userId}`);
  });
});

// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import http from "http";
// import { Server } from "socket.io";

// import authRoutes from "./routes/auth.routes.js";
// import messageRoutes from "./routes/message.routes.js";
// import userRoutes from "./routes/user.routes.js";

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 8000;

// // Create HTTP server
// const server = http.createServer(app);

// // === CORS CONFIG ===
// const FRONTEND_URL = "https://howsapp-38jz.onrender.com";

// app.use(
//   cors({
//     origin: FRONTEND_URL,
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(cookieParser());

// // === API ROUTES ===
// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);
// app.use("/api/users", userRoutes);

// // === SOCKET.IO ===
// const io = new Server(server, {
//   cors: {
//     origin: FRONTEND_URL,
//     credentials: true,
//   },
// });

// let onlineUsers = [];

// io.on("connection", (socket) => {
//   const userId = socket.handshake.query.userId;
//   if (userId && !onlineUsers.some((user) => user.userId === userId)) {
//     onlineUsers.push({ userId, socketId: socket.id });
//   }

//   io.emit("getOnlineUsers", onlineUsers);

//   socket.on("sendMessage", ({ senderId, receiverId, message }) => {
//     const receiver = onlineUsers.find((u) => u.userId === receiverId);
//     if (receiver) {
//       io.to(receiver.socketId).emit("newMessage", { senderId, message });
//     }
//   });

//   socket.on("disconnect", () => {
//     onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
//     io.emit("getOnlineUsers", onlineUsers);
//   });
// });

// // === MONGODB + START SERVER ===
// mongoose
//   .connect(process.env.MONGO_DB_URI)
//   .then(() => {
//     console.log("Connected to MongoDB");
//     server.listen(PORT, () =>
//       console.log(`Server running on port ${PORT} 🚀`)
//     );
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//   });
