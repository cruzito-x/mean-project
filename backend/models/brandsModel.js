const mongoose = require("mongoose");

const brandsSchema = new mongoose.Schema({
  id: String,
  name: String,
  photo: String,
  created_at: Date,
  updated_at: Date
});

const Brands = mongoose.model("Brands", brandsSchema);

module.exports = Brands;