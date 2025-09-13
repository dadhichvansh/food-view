import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import foodRoutes from './routes/food.routes.js';

// Initialize express app
const app = express();

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

export default app;
