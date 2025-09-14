import mongoose from 'mongoose';

const foodItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    videoUrl: { type: String, required: true },
    description: { type: String },
    foodPartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FoodPartner',
    },
    likesCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const FoodItem = mongoose.model('FoodItem', foodItemSchema);
export default FoodItem;
