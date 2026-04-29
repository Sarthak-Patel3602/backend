import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

dotenv.config();

const connectDB = async () => {
    try {
        console.log("hello");
        const connectionInstance = await mongoose.connect('mongodb+srv://Sarthak:Sarthak2104@cluster0.bmcnto3.mongodb.net/videotube');
        console.log(`MongoDB Connected !! DB HOST : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection Error", error);
        process.exit(1);
    }
}

export default connectDB;