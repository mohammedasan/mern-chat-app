import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
// const mongoose = require('mongoose');

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(express.json());
// // Middleware for parsing JSON requests
// app.use(express.json());

// // MongoDB connection
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected successfully'))
//   .catch(err => console.log('MongoDB connection error:', err));

// // Sample route to test server is running
// app.get('/', (req, res) => {
//   res.send('Hello World');
// });
app.get("/",(req,res)=>
{
    res.send("Hello WorldQss");
});
app.use("/api/auth",authRoutes)
// Start the server
 const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
