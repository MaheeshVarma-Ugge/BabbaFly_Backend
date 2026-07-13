// Paste controller code here
const bcrypt = require('bcryptjs');

const User = require('../models/User');

const generateToken = require('../utils/generateToken');

const {
  registerValidation,
  loginValidation,
  updateUserValidation
} = require('../validators/userValidator');

// =============================
// Register User
// POST /api/users/register
// =============================

const registerUser = async (req, res, next) => {
  try {
    const { error } = registerValidation(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const { name, email, phone, password, avatarUrl, role } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists.'
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      avatarUrl,
      role
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatarUrl: user.avatarUrl,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
};

// =============================
// Login User
// POST /api/users/login
// =============================

const loginUser = async (req, res, next) => {
  try {
    const { error } = loginValidation(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatarUrl: user.avatarUrl,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
};

// =============================
// Get User Profile
// GET /api/users/:id
// =============================

const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (err) {
    next(err);
  }
};

// =============================
// Update User
// PUT /api/users/:id
// =============================

const updateUser = async (req, res, next) => {
  try {
    const { error } = updateUserValidation(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    if (req.body.name !== undefined) user.name = req.body.name;

    if (req.body.email !== undefined) user.email = req.body.email;

    if (req.body.phone !== undefined) user.phone = req.body.phone;

    if (req.body.avatarUrl !== undefined) user.avatarUrl = req.body.avatarUrl;

    if (req.body.role !== undefined) user.role = req.body.role;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: 'User updated successfully.',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        avatarUrl: updatedUser.avatarUrl,
        role: updatedUser.role
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerUser,

  loginUser,

  getUserProfile,

  updateUser
};
