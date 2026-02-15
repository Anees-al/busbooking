import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import userRoute from './routes/userRoute.js'
import busRoute from './routes/busRoute.js'

import connectDb from './config/db.js';
import sheduleRoute from './routes/sheduleRoute.js';
import bookingRoute from './routes/bookingRoute.js'
import Razorpay from 'razorpay'

const app=express();
dotenv.config()
//connection to database
connectDb()

export const instance=new Razorpay({
  key_id:process.env. RAZORPAY_API_KEY,
  key_secret:process.env.RAZORPAY_SECRET_KEY
})





app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173",         
      "https://anees-al.github.io"], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}
))




app.use('/api/user',userRoute)
app.use('/api/bus',busRoute)
app.use('/api/shedule',sheduleRoute)
app.use('/api/booking',bookingRoute)


const port=process.env.PORT;

app.listen(port,"0.0.0.0",()=>console.log(`Server is running in the port ${port}`))