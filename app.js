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

const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const reviewRoutes = require('./routes/reviewRoutes');
app.use('/api', reviewRoutes);

module.exports = app;
