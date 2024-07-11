const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
});

const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  price: Number,
  category_id: String,
  category: String,
  sub_category: String,
  brand: [brandSchema],
  stock: Number,
  photo: String,
  technical_specifications: String,
  rating: Number,
  created_at: Date,
  updated_at: Date,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
