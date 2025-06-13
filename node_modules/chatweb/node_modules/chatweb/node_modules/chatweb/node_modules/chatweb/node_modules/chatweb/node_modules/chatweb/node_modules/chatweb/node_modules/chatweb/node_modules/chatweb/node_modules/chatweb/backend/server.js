// backend/server.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { Server } from "socket.io";
import http from "http";
import path from "path";

dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors({
  origin: ["https://howsapp-38jz.onrender.com"], // your frontend URL
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

// Static Frontend Serving (Optional if you're also deploying frontend separately)
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
);

// Socket.io
const io = new Server(server, {
  cors: {
    origin: "https://howsapp-38jz.onrender.com", // frontend
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User connected:", userId);
  socket.join(userId);

  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    io.to(receiverId).emit("newMessage", { senderId, message });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", userId);
  });
});

// Database Connection and Start Server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });
