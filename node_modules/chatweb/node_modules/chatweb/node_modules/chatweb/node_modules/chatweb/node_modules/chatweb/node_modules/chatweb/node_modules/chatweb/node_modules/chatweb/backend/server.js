
// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';

// import authRoutes from "./routes/auth.routes.js";
// import messageRoutes from "./routes/message.routes.js";
// import userRoutes from "./routes/user.routes.js";
// import connectToMongoDB from './db/connectToMongoDB.js';

// dotenv.config();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cookieParser());

// // CORS setup for frontend domain
// const allowedOrigins = [
//   'http://localhost:3000',
//   'https://howsapp-38jz.onrender.com' // ✅ Your deployed frontend
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/messages', messageRoutes);
// app.use('/api/users', userRoutes);

// // Start server
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   connectToMongoDB();
//   console.log(`Server running on port ${PORT}`);
// });

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["https://your-frontend-domain.com", "http://localhost:5173"],
    credentials: true,
  },
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) {
    onlineUsers.set(userId, socket.id);
    io.emit("getOnlineUsers", [...onlineUsers.keys()]);
  }

  socket.on("sendMessage", ({ to, from, message }) => {
    const receiverSocket = onlineUsers.get(to);
    if (receiverSocket) {
      io.to(receiverSocket).emit("newMessage", message);
    }
  });

  socket.on("disconnect", () => {
    for (let [key, value] of onlineUsers.entries()) {
      if (value === socket.id) {
        onlineUsers.delete(key);
        break;
      }
    }
    io.emit("getOnlineUsers", [...onlineUsers.keys()]);
  });
});

app.use(cors({ origin: ["https://your-frontend-domain.com", "http://localhost:5173"], credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

mongoose.connect(process.env.MONGO_DB_URI).then(() => {
  console.log("Connected to MongoDB");
  server.listen(process.env.PORT || 8000, () => {
    console.log("Server is running on port", process.env.PORT || 8000);
  });
});