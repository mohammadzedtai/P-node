import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import studentRoutes from "./routes/studentRoutes.js"
import teacherRoutes from "./routes/teacherRoutes.js"
import courseRoutes from "./routes/courseRoutes.js"
import marksRoutes from "./routes/marksRoutes.js"
import attendanceRoutes from"./routes/attendanceRoutes.js"
import assignmentRoutes from "./routes/assignmentRoutes.js"
import connectDB from "./config/db.js"
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
await connectDB()

app.use("/uploads", express.static("uploads"))

app.use("/api/auth", authRoutes)
app.use("/api/attendances", attendanceRoutes)
app.use("/api/students", studentRoutes)
app.use("/api/teachers", teacherRoutes)
app.use("/api/courses", courseRoutes)
app.use("/api/marks", marksRoutes)
app.use("/api/assignments", assignmentRoutes)

app.get("/", (req, res) => {
  res.send("API Running")
})

const PORT = process.env.PORT 

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})