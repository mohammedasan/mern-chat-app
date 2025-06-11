import mongoose from "mongoose";
const connectToMongoDB=async()=>{
    try {
        console.log("MONGO_DB_URI from .env:", process.env.MONGO_DB_URI);

        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to MongoDB");
    }  catch (error) {
        console.log("error connecting to mongoDB",error.message);
    }
};
export default connectToMongoDB;