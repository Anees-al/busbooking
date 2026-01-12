import express from 'express';
import { createUser, getAllUser, getUserById, login, logout } from '../controllers/userController.js';
import authentication from '../middleware/autheticationMiddleware.js';
import isAdmin from '../middleware/isAdmin.js';

const router=express.Router();


router.post('/createuser',createUser);
router.post('/login',login)
router.post('/logout',logout)
router.get('/getuser/:id',authentication, getUserById)
router.get('/getallusers', isAdmin, getAllUser);

export default router;
