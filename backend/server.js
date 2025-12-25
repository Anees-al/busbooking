import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import userRoute from './routes/userRoute.js'
import busRoute from './routes/busRoute.js'

import connectDb from './config/db.js';

const app=express();
dotenv.config()
//connection to database
connectDb()


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173",         
      "http://192.168.1.3:5173"], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}
))



app.use('/api/user',userRoute)
app.use('/api/bus',busRoute)



const port=process.env.PORT;

app.listen(port,"0.0.0.0",()=>console.log(`Server is running in the port ${port}`))