import mongoose from "mongoose"
import dotenv from "dotenv"

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Mongoose connctDB");
        
    } catch (error) {
        console.log(error.message)
    }
}