import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import register from "../routes/auth/register.auth.js"
import login from "../routes/auth/login.auth.js"
import upload_file from "../routes/files/upload.file.js"
import upload_asset from "../routes/files/upload.asset.js"

// initialization 
const app = express();

// env configuration
dotenv.config();

// middlewares
app.use(cors())
app.use(express.json())

// routes
app.use("/auth/user", register)
app.use("/auth/user", login)
app.use("/upload/files", upload_file)
app.use("/upload/asset", upload_asset)

// PORT
const PORT = process.env.PORT || 3000;

// listen on port 3000
app.listen(PORT)