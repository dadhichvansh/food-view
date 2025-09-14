import { v4 as uuid } from 'uuid';
import { uploadFile } from '../services/storage.service.js';
import FoodItem from '../models/foodItem.model.js';
import Like from '../models/likes.model.js';
import Save from '../models/save.model.js';

// Create a new food item, method: POST /api/food
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

// Get all food items, method: GET /api/food
export async function getFoodItems(req, res) {
  try {
    const foodItems = await FoodItem.find();
    res.status(200).json({
      ok: true,
      foodItems,
    });
  } catch (error) {
    console.error('Error in getFoodItems():', error);
    res.status(500).json({
      ok: false,
      message: 'Failed to fetch food items',
    });
  }
}

// Like a food item, method: POST /api/food/like
export async function likeFoodItem(req, res) {
  try {
    const { foodItemId } = req.body;
    const user = req.user;

    // Check if the food item exists
    const foodItem = await FoodItem.findById(foodItemId);
    if (!foodItem) {
      return res.status(404).json({
        ok: false,
        message: 'Food item not found',
      });
    }

    // Check if the user has already liked the food item
    const existingLike = await Like.findOne({
      user: user._id,
      food: foodItemId,
    });
    if (existingLike) {
      await Like.deleteOne({ user: user._id, food: foodItemId });
      await FoodItem.findByIdAndUpdate(foodItemId, {
        $inc: { likesCount: -1 },
      });
      return res.status(200).json({
        ok: true,
        message: 'Food item unliked successfully',
      });
    }

    // Create a new like
    const like = await Like.create({ user: user._id, food: foodItemId });
    await FoodItem.findByIdAndUpdate(foodItemId, {
      $inc: { likesCount: 1 },
    });
    res.status(201).json({
      ok: true,
      message: 'Food item liked successfully',
      like,
    });
  } catch (error) {
    console.error('Error in likeFoodItem():', error);
    res.status(500).json({
      ok: false,
      message: 'Failed to like food item',
    });
  }
}

// Save a food item, method: POST /api/food/save
export async function saveFoodItem(req, res) {
  try {
    const { foodItemId } = req.body;
    const user = req.user;

    // Check if the food item exists
    const foodItem = await FoodItem.findById(foodItemId);
    if (!foodItem) {
      return res.status(404).json({
        ok: false,
        message: 'Food item not found',
      });
    }

    // Check if the user has already saved the food item
    const existingSave = await Save.findOne({
      user: user._id,
      food: foodItemId,
    });
    if (existingSave) {
      await Save.deleteOne({ user: user._id, food: foodItemId });
      return res.status(200).json({
        ok: true,
        message: 'Food item unsaved successfully',
      });
    }

    // Create a new save
    const save = await Save.create({ user: user._id, food: foodItemId });
    res.status(201).json({
      ok: true,
      message: 'Food item saved successfully',
      save,
    });
  } catch (error) {
    console.error('Error in saveFoodItem():', error);
    res.status(500).json({
      ok: false,
      message: 'Failed to save food item',
    });
  }
}
