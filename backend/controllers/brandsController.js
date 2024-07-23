const Brands = require("../models/brandsModel");

exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brands.find();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchBrandByName = async (req, res) => {
  const brand = req.params.name;

  try {
    const brands = await Brands.find({ 'name': brand });
    
    if (!brands) return res.status(404).json({ message: "Brand not found" });
    
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}