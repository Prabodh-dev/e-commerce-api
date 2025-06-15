const Order = require('../models/Order');
const Cart = require('../models/Cart');

exports.placeOrder = async (req, res) => {
  const { shippingAddress } = req.body;
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  const totalAmount = cart.items.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  const order = new Order({
    user: userId,
    orderItems: cart.items.map((i) => ({
      product: i.product._id,
      quantity: i.quantity,
    })),
    shippingAddress,
    totalAmount,
  });

  await order.save();
  await Cart.findOneAndDelete({ user: userId });

  res.status(201).json(order);
};

exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate(
    'orderItems.product',
  );
  res.status(200).json(orders);
};

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate('user', 'name')
    .populate('orderItems.product');
  res.status(200).json(orders);
};

exports.updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  order.status = req.body.status;
  await order.save();

  res.status(200).json(order);
};
