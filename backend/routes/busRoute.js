import express from 'express';
import { createBus, getBusByOperators, getBusByRoutes } from '../controllers/busControllers.js';

const router=express.Router();


router.post('/createbus',createBus);
router.get('/getroutebybus/:routePath',getBusByRoutes);
router.get('/getbusesbyoperator/:busoperator',getBusByOperators);
export default router;
