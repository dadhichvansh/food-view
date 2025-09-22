import mongoose from 'mongoose';

const foodPartnerSchema = new mongoose.Schema(
  {
    ownerName: { type: String, required: true },
    restaurantName: { type: String, required: true },
    restaurantDescription: { type: String },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const FoodPartner = mongoose.model('FoodPartner', foodPartnerSchema);
export default FoodPartner;
