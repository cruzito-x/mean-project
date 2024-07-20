const Product = require("../models/productsModel");
const Brands = require("../models/brandsModel");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ 'created_at': -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBestRatedProducts = async (req, res) => {
  try {
    const bestRated = await Product.find().sort({ 'rating': -1 });
    res.status(200).json(bestRated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductsByCategory = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const products = await Product.find({ 'category_id': categoryId });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductDetails = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.find({ 'id': productId });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getProductsByBrand = async (req, res) => {
  const brandName = req.params.brand;
  try {
    const products = await Product.find({ 'brand.name' : brandName });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getProductsByFamily = async (req, res) => {
  const familyName = req.params.family;
  try {
    const products = await Product.find({ 'sub_category' : familyName });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getProductsOffers = async (req, res) => {
  try {
    const products = await Product.find({ 'discount': { $ne: 0 } }).sort({ price: 1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
