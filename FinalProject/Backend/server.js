import express from "express";
import cors from 'cors';
import { connectDb } from "./config/db.js";
import dotenv from 'dotenv';
import { router } from "./router/Router.js";
dotenv.config();

const app = express()
app.use(express.json());
app.use(cors());
await connectDb()

app.use("/api/auth", router);
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);

})