import mongoose from 'mongoose'

const bookingScheama= new mongoose.Schema({
   busId:{type:mongoose.Schema.Types.ObjectId,ref:'bus',required:true},
   userId:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
seatNumber: Number,
  travelDate: Date,
  bookingDate: { type: Date, default: Date.now }

})



const bookingModel=new mongoose.model('booking',bookingScheama);
export default bookingModel;