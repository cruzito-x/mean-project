const Product = require("../models/productsModel");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBestRatedProducts = async (req, res) => {
  try {
    const bestRated = await Product.find().sort({rating: -1});
    res.status(200).json(bestRated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}