
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
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectToMongoDB from './db/connectToMongoDB.js';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();

const app = express();
const server = http.createServer(app); // ✅ create server explicitly

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'https://howsapp-38jz.onrender.com'],
    credentials: true,
  },
});

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: ['http://localhost:3000', 'https://howsapp-38jz.onrender.com'],
  credentials: true,
}));

// ✅ REST API Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

// ✅ SOCKET.IO setup
const onlineUsers = new Map();

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) {
    onlineUsers.set(userId, socket.id);
    io.emit("getOnlineUsers", [...onlineUsers.keys()]);
  }

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

// ✅ Connect DB and start server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});
