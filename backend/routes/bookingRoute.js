import express from 'express'
import { createbooking, getAllBooking, getBusBooking, getUserBooking } from '../controllers/bookingController.js';

const router=express.Router();

router.post('/createbooking',createbooking);
router.get('/getbooking',getAllBooking);
router.get('/getbookingtouser/:userId',getUserBooking);
router.get('/getbookingtobus/:busId',getBusBooking);



export default router;