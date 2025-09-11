import express from 'express';
import {
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/auth.controller.js';

// Router instance
const router = express.Router();

// Auth routes
router.post('/user/register', registerUser);
router.post('/user/login', loginUser);
router.get('/user/logout', logoutUser);

export default router;
