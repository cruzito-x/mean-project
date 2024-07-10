const Categories = require("../models/categoriesModel");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.find();
    res.status(200).json(categories);
    console.log(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};