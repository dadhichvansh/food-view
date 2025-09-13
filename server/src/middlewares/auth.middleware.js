import jwt from 'jsonwebtoken';
import FoodPartner from '../models/foodPartner.model.js';
import User from '../models/user.model.js';

export async function authFoodPartnerMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      ok: false,
      message: 'Please login first',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const foodPartner = await FoodPartner.findById(decoded.id);

    req.foodPartner = foodPartner;
    next();
  } catch (error) {
    console.error('Error in authFoodPartnerMiddleware():', error);
    return res.status(401).json({
      ok: false,
      message: 'Unauthorized access',
    });
  }
}

export async function authUserMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      ok: false,
      message: 'Please login first',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    req.user = user;
    next();
  } catch (error) {
    console.error('Error in authUserMiddleware():', error);
    return res.status(401).json({
      ok: false,
      message: 'Unauthorized access',
    });
  }
}
