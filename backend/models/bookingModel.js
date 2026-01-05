import mongoose from 'mongoose'

const bookingScheama= new mongoose.Schema({
   busId:{type:mongoose.Schema.Types.ObjectId,ref:'bus',required:true},
   userId:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
   sheduledId:{type:mongoose.Schema.Types.ObjectId,ref:'sheduled',required:true},
seats: [{ type: String, required: true }],

  
  bookingDate: { type: Date, default: Date.now },
  travelDate: { type: Date, required: true },
  bookingDate: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['booked', 'cancelled', 'completed'], 
    default: 'booked' 
  },

},{timestamps:true});



const bookingModel=new mongoose.model('booking',bookingScheama);
export default bookingModel;