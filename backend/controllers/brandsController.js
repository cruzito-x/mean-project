const Brands = require("../models/brandsModel");

exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brands.find();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};