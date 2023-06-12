import express from "express";
import dotenv from "dotenv";
import cors from "cors"

// initialization 
const app = express();

// env configuration
dotenv.config();

// middlewares
app.use(cors())
app.use(express.json())

// routes

// PORT
const PORT = process.env.PORT || 3000;

// listen on port 3000
app.listen(PORT)