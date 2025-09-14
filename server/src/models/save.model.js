import mongoose from 'mongoose';

const saveSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FoodItem',
      required: true,
    },
  },
  { timestamps: true }
);

const Save = mongoose.model('Save', saveSchema);
export default Save;
