import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import foodRoutes from './routes/food.routes.js';
import foodPartnerRoutes from './routes/foodPartner.routes.js';

// Initialize express app
const app = express();

// CORS middleware
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Dummy route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Auth routes
app.use('/api/auth', authRoutes);

// Food routes
app.use('/api/food', foodRoutes);

// Food partner routes
app.use('/api/food-partner', foodPartnerRoutes);

export default app;
