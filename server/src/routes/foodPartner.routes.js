import express from 'express';
import { authUserMiddleware } from '../middlewares/auth.middleware.js';
import { getFoodPartnerById } from '../controllers/foodPartner.controller.js';

const router = express.Router();

// GET /api/food-partner/:id [public]
router.get('/:id', authUserMiddleware, getFoodPartnerById);

export default router;
