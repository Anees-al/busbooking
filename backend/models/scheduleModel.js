import mongoose from 'mongoose'


const sheduleSchema=new mongoose.Schema({
    busId:{type:mongoose.Schema.Types.ObjectId},
    date:{type: Date, required: true},
    seats:[
        {
      seatNumber: Number,
      isBooked: { type: Boolean, default: false },
      bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'booking', default: null }
    }
    ]
})


const sheduleModel=new mongoose.model('shedule',sheduleSchema);
export default sheduleModel;