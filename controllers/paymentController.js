const stripe = require('../utils/stripe');

const createStripePaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // dollars to cents
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: 'Stripe payment failed' });
  }
};

module.exports = { createStripePaymentIntent };
