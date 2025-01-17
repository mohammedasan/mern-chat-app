import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import {app,server} from "./socket/socket.js";
// const mongoose = require('mongoose');

dotenv.config(); // Load environment variables from .env file

const PORT = process.env.PORT || 8000;
// const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:3000', // Allow requests from frontend
//   credentials: true,
// }));
// app.get("/",(req,res)=>
// {
//     res.send("Hello WorldQss");
// });
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)
// Start the server
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
