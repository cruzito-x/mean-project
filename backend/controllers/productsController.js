// controllers/productsController.js
const Product = require("../models/productsModel");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
    console.log(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
