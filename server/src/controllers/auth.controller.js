import User from '../models/user.model.js';
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
export async function logoutUser(req, res) {
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
