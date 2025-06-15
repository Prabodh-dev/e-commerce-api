const User = require('../models/User');
const Order = require('../models/Order');

// ✅ Get all users (without password)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: 'Failed to fetch users' });
  }
};

// ✅ Get all orders (populate user info)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ msg: 'Failed to fetch orders' });
  }
};

module.exports = {
  getAllUsers,
  getAllOrders,
};
