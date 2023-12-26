import dotenv from "dotenv"
dotenv.config();
import mongoose from "mongoose";
import express from "express"
import cors from "cors"
import router from "./Routes/userRoutes.js"


const app=express();
const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
app.use(cors(corsOpts));
const port=process.env.PORT;
app.use(express.json());

app.use("/api/user",router)
app.listen(port,()=>{

    console.log(`Server running at http://localhost:${port}`)
})
const DB_URL=process.env.CONNECTION_URL;
mongoose.connect(DB_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>
{
    console.log("MongoDB database connected")
}).catch((error)=>
{
    console.log(error)
    })