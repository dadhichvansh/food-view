import express from 'express';
import multer from 'multer';
import { createFoodItem } from '../controllers/food.controller.js';
import { authFoodPartnerMiddleware } from '../middlewares/auth.middleware.js';

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

// Create a new food item (protected route)
router.post(
  '/',
  authFoodPartnerMiddleware,
  upload.single('video'),
  createFoodItem
);

export default router;
