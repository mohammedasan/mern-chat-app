import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
// const mongoose = require('mongoose');

dotenv.config(); // Load environment variables from .env file

const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(cookieParser())
// app.get("/",(req,res)=>
// {
//     res.send("Hello WorldQss");
// });
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)
// Start the server
app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
