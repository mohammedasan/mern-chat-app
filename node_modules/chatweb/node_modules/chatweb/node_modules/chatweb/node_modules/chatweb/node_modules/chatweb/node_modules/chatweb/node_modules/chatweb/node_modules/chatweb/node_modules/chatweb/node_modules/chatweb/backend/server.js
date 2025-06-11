// import path from "path";
// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from 'cors';

// import authRoutes from "./routes/auth.routes.js";
// import messageRoutes from "./routes/message.routes.js";
// import userRoutes from "./routes/user.routes.js";

// import connectToMongoDB from "./db/connectToMongoDB.js";
// import {app,server} from "./socket/socket.js";
// // const mongoose = require('mongoose');

// dotenv.config(); // Load environment variables from .env file

// const PORT = process.env.PORT || 8000;
// const __dirname = path.resolve();
// // const app = express();
// app.use(express.json());
// app.use(cookieParser());
// // app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:3000', // Allow requests from frontend
//   credentials: true,
// }));
// // app.get("/",(req,res)=>
// // {
// //     res.send("Hello WorldQss");
// // });
// app.use("/api/auth",authRoutes)
// app.use("/api/messages",messageRoutes)
// app.use("/api/users",userRoutes)

// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// app.get("*", (req,res)=>{
//   res.sendFile(path.join(__dirname, "frontend","dist","index.html"));
// });
// // Start the server
// server.listen(PORT, () => {
//   connectToMongoDB();
//   console.log(`Server is running on port ${PORT}`);
// });

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from './db/connectToMongoDB.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

// CORS setup
const allowedOrigins = [
  'http://localhost:3000',
  'https://your-frontend.onrender.com' // ✅ Replace with actual frontend Render URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

// Optional: Serve frontend in production

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});
