import { v4 as uuid } from 'uuid';
import { uploadFile } from '../services/storage.service.js';
import FoodItem from '../models/foodItem.model.js';

export async function createFoodItem(req, res) {
  try {
    const { name, description } = req.body;
    const fileUploadResult = await uploadFile(req.file.buffer, uuid());

    const foodItem = await FoodItem.create({
      name,
      description,
      videoUrl: fileUploadResult.url,
      foodPartner: req.foodPartner._id,
    });

    res.status(201).json({
      ok: true,
      message: 'Food item created successfully',
      food: foodItem,
    });
  } catch (error) {
    console.error('Error in createFoodItem():', error);
    res.status(500).json({
      ok: false,
      message: 'Failed to create food item',
    });
  }
}
