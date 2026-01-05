import express from 'express';
import { createUser, getAllUser, getUserById, login } from '../controllers/userController.js';

const router=express.Router();


router.post('/createuser',createUser);
router.post('/login',login)
router.get('/getuser/:id',getUserById)
router.get('/getallusers',getAllUser);

export default router;
