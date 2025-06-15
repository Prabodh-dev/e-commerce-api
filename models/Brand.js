const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  logo: {
    type: String,
  },
});

module.exports = mongoose.model('Brand', brandSchema);
