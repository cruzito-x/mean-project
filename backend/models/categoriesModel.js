const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  subcategories: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      subcategories: [this],
    },
  ],
});

const categorySchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  photo: { type: String, required: true },
  subcategories: [subcategorySchema],
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
