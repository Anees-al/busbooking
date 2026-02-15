import bookingModel from "../models/bookingModel.js";
import sheduleModel from "../models/scheduleModel.js";
import mongoose from 'mongoose'
import { instance } from "../server.js";

export const createbooking=async(req,res)=>{
    try {
        const {busId,userId,sheduledId,seats,travelDate}=req.body;
        



        if(!busId||!userId||!sheduledId||!seats||!travelDate){
            return res.status(400).json({message:'please fill alla the fields'})
        }

        const existingBookig=await bookingModel.find({
            sheduledId,
            travelDate,
            status:'booked',
            seats:{$in:seats}
        });


        if(existingBookig.length>0){
            return res.status(400).json({message:'the booking already created'});

        }


        const newBooking = new bookingModel({
      busId,
      userId,
      sheduledId,
      seats,
      travelDate
    });

    const savedBooking = await newBooking.save();


    await sheduleModel.updateOne(
            { _id: sheduledId },
            { $set: { "seats.$[elem].isBooked": true } },
            { 
                arrayFilters: [{ "elem.seatNumber": { $in: seats } }] 
            }
        );



    return res.status(200).json({message:'successfully created',savedBooking})


    } catch (error) {
        return res.status(400).json(error.message)
    }
}




export const getAllBooking=async(req,res)=>{
    try {
        const bookings=await bookingModel.find({});
        return res.status(200).json({success:true,message:'successfully fetched all bookings',bookings,totalbooking:bookings.length})
    } catch (error) {
        return res.status(400).json({success:false,message:error.message})
    }
}


export const processPayment=async(req,res)=>{
    try {
        const options={
            amount:Number(req.body.amount*100),
            currency:"INR"
        }
        const order =await instance.orders.create(options)
        res.status(200).json({message:'succefully order',order})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}


export const getKey=async(req,res)=>{
    return res.status(200).json({
        key:process.env.RAZORPAY_API_KEY
    })
}

export const getUserBooking=async(req,res)=>{
    try {
        const {userId} =req.params;
        
        const booking=await bookingModel.find({userId}).populate('busId').populate('userId')
        return res.status(200).json({message:'success',booking})
    } catch (error) {
        return res.status(400).json(error)
    }
}



export const getBusBooking=async(req,res)=>{
    try {
        const {busId}=req.params;
        const booking=await bookingModel.find({busId}).populate('userId').populate('busId');
        return res.status(200).json({message:'success',booking,totalbookings:booking.length})
    } catch (error) {
         return res.status(400).json(error)
    }
}



export const verifybooking=async(req,res)=>{
    try {
       const {busId}=req.params; 
    } catch (error) {
        
    }
}