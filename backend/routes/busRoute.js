import express from 'express';
import { createBus, getBusById, getBusByOperators, getBusByRoutes, searchBuses } from '../controllers/busControllers.js';

const router=express.Router();


router.post('/createbus',createBus);
router.get('/getroutebybus/:routePath',getBusByRoutes);
router.get('/getbusesbyoperator/:busoperator',getBusByOperators);
router.post('/search',searchBuses);
router.get('/getbusbyid/:id',getBusById)
export default router;
