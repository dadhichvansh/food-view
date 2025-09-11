import mongoose from 'mongoose';

const dbUri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

// Function to connect to MongoDB
export default function connectDB() {
  mongoose
    .connect(`${dbUri}/${dbName}`)
    .then(() => {
      console.log('MongoDB connected successfully');
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
    });
}
