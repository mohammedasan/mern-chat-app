// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./db/connectToMongoDB.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/messages.routes.js";
import { Server } from "socket.io";
import http from "http";

// Load .env first!
dotenv.config();

const app = express();
const server = http.createServer(app);

// Middlewares
app.use(cors({
  origin: "https://howsapp-38jz.onrender.com", // frontend URL
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Connect DB
connectToMongoDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "https://howsapp-38jz.onrender.com",
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("🔥 New socket connected", socket.id);

  socket.on("sendMessage", (message) => {
    socket.broadcast.emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected", socket.id);
  });
});
