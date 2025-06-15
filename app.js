const express = require('express');
const morgan = require('morgan');
require('express-async-errors');

//middlewares
const app = express();
app.use(express.json());

//routes
app.get('/', (req, res) => {
  res.send('E-commerce API is working');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.statusCode || 500)
    .json({ error: err.message || 'Something went wrong' });
});

//routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const reviewRoutes = require('./routes/reviewRoutes');
app.use('/api', reviewRoutes);

const categoryRoutes = require('./routes/categoryRoutes');
const brandRoutes = require('./routes/brandRoutes');

app.use('/api/categories', categoryRoutes);
app.use('/api/brands', brandRoutes);

const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

module.exports = app;
