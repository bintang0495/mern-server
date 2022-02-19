const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'field tidak boleh kosong'],
    minlength: 3,
    maxlength: 50,
  },
  price: {
    type: Number,
    required: true,
    min: 1000000,
    max: 100000000,
  },
  stock: Number,
  status: {
    type: Boolean,
    default: true,
  },
  imageUrl: {
    type: String,
  },
});

const Product = mongoose.model('products', productSchema);
module.exports = Product;
