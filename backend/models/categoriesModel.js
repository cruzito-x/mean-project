const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  subcategories: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      total_sold: { type: Number, required: true }
    }
  ]
});

const categorySchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  photo: { type: String, required: true },
  subcategories: [subcategorySchema],
  total_sold: { type: Number, required: true }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
