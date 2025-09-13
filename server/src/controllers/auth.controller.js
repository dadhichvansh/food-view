import User from '../models/user.model.js';
import FoodPartner from '../models/foodPartner.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new user, method: POST /api/auth/user/register
export async function registerUser(req, res) {
  try {
    // Extract user details from request body
    const { fullName, email, password } = req.body;

    // Check if user already exists
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({
        ok: false,
        message: 'User already exists',
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Send token and user details in response
    res.cookie('token', token);
    res.status(201).json({
      ok: true,
      message: 'User registered successfully',
      user: { id: user._id, name: user.fullName, email: user.email },
    });
  } catch (error) {
    console.error('Error in registerUser():', error);
    return res.status(500).json({
      ok: false,
      message: 'Internal server error',
    });
  }
}

// Login an existing user, method: POST /api/auth/user/login
export async function loginUser(req, res) {
  try {
    // Extract user credentials from request body
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        message: 'Invalid email or password',
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        ok: false,
        message: 'Invalid email or password',
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Send token and user details in response
    res.cookie('token', token);
    res.status(200).json({
      ok: true,
      message: 'User logged in successfully',
      user: { id: user._id, name: user.fullName, email: user.email },
    });
  } catch (error) {
    console.error('Error in loginUser():', error);
    return res.status(500).json({
      ok: false,
      message: 'Internal server error',
    });
  }
}

// Logout a user, method: GET /api/auth/user/logout
export function logoutUser(req, res) {
  try {
    // Clear the token cookie & send response
    res.clearCookie('token');
    res.status(200).json({
      ok: true,
      message: 'User logged out successfully',
    });
  } catch (error) {
    console.error('Error in logoutUser():', error);
    return res.status(500).json({
      ok: false,
      message: 'Internal server error',
    });
  }
}

// Register a new food partner, method: POST /api/auth/food-partner/register
export async function registerFoodPartner(req, res) {
  try {
    // Extract food partner details from request body
    const { name, contactName, phone, address, email, password } = req.body;

    // Check if food partner already exists
    const foodPartnerAlreadyExists = await FoodPartner.findOne({ email });
    if (foodPartnerAlreadyExists) {
      return res.status(400).json({
        ok: false,
        message: 'Food partner already exists',
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new food partner
    const foodPartner = await FoodPartner.create({
      name,
      contactName,
      phone,
      address,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET);

    // Send token and food partner details in response
    res.cookie('token', token);
    res.status(201).json({
      ok: true,
      message: 'Food partner registered successfully',
      foodPartner: {
        id: foodPartner._id,
        name: foodPartner.name,
        contactName: foodPartner.contactName,
        phone: foodPartner.phone,
        address: foodPartner.address,
        email: foodPartner.email,
      },
    });
  } catch (error) {
    console.error('Error in registerFoodPartner():', error);
    return res.status(500).json({
      ok: false,
      message: 'Internal server error',
    });
  }
}

// Login an existing food partner, method: POST /api/auth/food-partner/login
export async function loginFoodPartner(req, res) {
  try {
    // Extract food partner credentials from request body
    const { email, password } = req.body;

    // Find food partner by email
    const foodPartner = await FoodPartner.findOne({ email });
    if (!foodPartner) {
      return res.status(400).json({
        ok: false,
        message: 'Invalid email or password',
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, foodPartner.password);
    if (!isMatch) {
      return res.status(400).json({
        ok: false,
        message: 'Invalid email or password',
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET);

    // Send token and food partner details in response
    res.cookie('token', token);
    res.status(200).json({
      ok: true,
      message: 'Food partner logged in successfully',
      foodPartner: {
        id: foodPartner._id,
        name: foodPartner.name,
        email: foodPartner.email,
      },
    });
  } catch (error) {
    console.error('Error in loginFoodPartner():', error);
    return res.status(500).json({
      ok: false,
      message: 'Internal server error',
    });
  }
}

// Logout a food partner, method: GET /api/auth/food-partner/logout
export function logoutFoodPartner(req, res) {
  try {
    // Clear the token cookie & send response
    res.clearCookie('token');
    res.status(200).json({
      ok: true,
      message: 'Food partner logged out successfully',
    });
  } catch (error) {
    console.error('Error in logoutFoodPartner():', error);
    return res.status(500).json({
      ok: false,
      message: 'Internal server error',
    });
  }
}
