import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import chatRoutes from "./routes/chat.js";


dotenv.config();
const app=express();
const PORT=process.env.PORT || 5000;


app.use(cors());
app.use(express.json());



app.use('/api', authRoutes);
app.use('/api/chat', chatRoutes);


  
mongoose.connect(process.env.MONGO_URI,{})
  .then(() => app.listen(5000, () => console.log('Server started on port 5000')))
  .catch(err => console.log(err));

