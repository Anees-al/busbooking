import express from 'express'
import { createbooking, getAllBooking, getBusBooking, getKey, getUserBooking, processPayment } from '../controllers/bookingController.js';

const router=express.Router();

router.post('/createbooking',createbooking);
router.get('/getbooking',getAllBooking);
router.get('/getbookingtouser/:userId',getUserBooking);
router.get('/getbookingtobus/:busId',getBusBooking);
router.post('/process/payment',processPayment)
router.get('/getkey',getKey)



export default router;