import FoodItem from '../models/foodItem.model.js';
import FoodPartner from '../models/foodPartner.model.js';

export async function getFoodPartnerById(req, res) {
  try {
    const foodPartnerId = req.params.id;
    const foodPartner = await FoodPartner.findById(foodPartnerId);
    if (!foodPartner) {
      return res.status(404).json({
        ok: false,
        message: 'Food partner not found',
      });
    }

    const foodItemsByPartner = await FoodItem.find({
      foodPartner: foodPartnerId,
    });
    if (!foodItemsByPartner) {
      return res.status(404).json({
        ok: false,
        message: 'Food items not found',
      });
    }

    res.json({
      ok: true,
      message: 'Food partner retrieved successfully',
      foodPartner: {
        ...foodPartner.toObject(),
        foodItems: foodItemsByPartner,
      },
    });
  } catch (error) {
    console.error('Error in getFoodPartnerById():', error);
    res.status(500).json({ ok: false, message: 'Internal server error' });
  }
}
