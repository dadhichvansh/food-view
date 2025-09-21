import express from 'express';
import multer from 'multer';
import {
  createFoodItem,
  getFoodItems,
  likeFoodItem,
  saveFoodItem,
} from '../controllers/food.controller.js';
import {
  authFoodPartnerMiddleware,
  authUserMiddleware,
} from '../middlewares/auth.middleware.js';

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

// POST /api/food [protected]
router.post(
  '/',
  authFoodPartnerMiddleware,
  upload.single('video'),
  createFoodItem
);

// GET /api/food [protected]
router.get('/', authUserMiddleware, getFoodItems);

// POST /api/food/like [protected]
router.post('/like', authUserMiddleware, likeFoodItem);

// POST /api/food/save [protected]
router.post('/save', authUserMiddleware, saveFoodItem);

export default router;
