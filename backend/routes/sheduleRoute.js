import express from 'express';
import {  getOrCreateSchedule } from '../controllers/scheduleController.js';

const router=express.Router()


router.post('/create', getOrCreateSchedule);


export default router;