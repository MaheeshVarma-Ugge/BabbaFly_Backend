// Paste controller code here
const Order = require('../models/Order');
const Listing = require('../models/Listing');
const User = require('../models/User');

const { orderValidation } = require('../validators/orderValidator');

// ========================================
// POST /api/orders
// Place New Order
// ========================================

const placeOrder = async (req, res, next) => {
  try {
    const body = {
      ...req.body,
      userId: req.user._id
    };

    const { error } = orderValidation(body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const user = await User.findById(body.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    const listing = await Listing.findById(body.listingId);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found.'
      });
    }

    const order = await Order.create({
      userId: body.userId,
      listingId: body.listingId,
      amount: body.amount,
      status: body.status || 'Pending',
      paymentStatus: body.paymentStatus || 'Pending'
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully.',
      order
    });
  } catch (err) {
    next(err);
  }
};

// ========================================
// GET /api/orders/user/:userId
// Get All Orders of User
// ========================================

const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      userId: req.params.userId
    })
      .populate('listingId')
      .populate('userId', '-password')
      .sort({
        createdAt: -1
      });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (err) {
    next(err);
  }
};

// ========================================
// GET /api/orders/:id
// Get Order Details
// ========================================

const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('listingId')
      .populate('userId', '-password');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found.'
      });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (err) {
    next(err);
  }
};

// ========================================
// PUT /api/orders/:id
// Update Order Status
// ========================================

const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found.'
      });
    }

    order.status = req.body.status ?? order.status;

    order.paymentStatus = req.body.paymentStatus ?? order.paymentStatus;

    order.amount = req.body.amount ?? order.amount;

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order updated successfully.',
      order
    });
  } catch (err) {
    next(err);
  }
};

// ========================================
// DELETE /api/orders/:id
// Cancel/Delete Order
// ========================================

const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found.'
      });
    }

    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Order deleted successfully.'
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  placeOrder,

  getUserOrders,

  getOrderById,

  updateOrder,

  deleteOrder
};
