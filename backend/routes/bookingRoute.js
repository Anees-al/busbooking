import express from 'express'
import { createbooking, getAllBooking, getUserBooking } from '../controllers/bookingController.js';

const router=express.Router();

router.post('/createbooking',createbooking);
router.get('/getbooking',getAllBooking);
router.get('/getbookingtouser/:userId',getUserBooking);


export default router;