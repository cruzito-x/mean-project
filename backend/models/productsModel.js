const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  price: Number,
  categorie: String,
  sub_categorie: String,
  brand: String,
  stock: Number,
  photo: String,
  technical_specifications: String,
  rating: Number,
  created_at: Date,
  updated_at: Date
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;