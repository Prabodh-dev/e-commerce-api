const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const userId = req.user._id;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    } else {
      // Remove items that have no product (cleanup for broken data)
      cart.items = cart.items.filter((i) => i.product);
    }

    const itemIndex = cart.items.findIndex(
      (i) => i.product && i.product.toString() === productId,
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    const populatedCart = await cart.populate('items.product');

    res.status(200).json(populatedCart);
  } catch (err) {
    res.status(500).json({ msg: 'Something went wrong', error: err.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      'items.product',
    );

    if (!cart) return res.status(404).json({ msg: 'Cart not found' });

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch cart', error: err.message });
  }
};
