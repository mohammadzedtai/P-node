import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connect } from "mongoose"
import { studentRouter } from "./routes/studentRoutes.js"
import { connectDB } from "./config/db.js"


const app = express()
app.use(express.json())
app.use(cors())

dotenv.config()

await connectDB()

app.use("/api/student",studentRouter)

const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`server is running ${PORT} `)
})
