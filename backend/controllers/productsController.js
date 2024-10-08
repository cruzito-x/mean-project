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

exports.getMostPopularProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ 'total_sold': -1 }).limit(5);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getBestRatedProducts = async (req, res) => {
  try {
    const bestRated = await Product.find().sort({ 'rating': -1 }).limit(5);
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
  const subcategory = req.params.subcategory;
  try {
    const products = await Product.find({ 'sub_category' : subcategory });
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

exports.searchProductsByName = async (req, res) => {
  const name = req.params.name;
  try {
    const products = await Product.find({ 'name': name });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.searchProductsByCategoryAndBrand = async (req, res) => {
  const category = req.params.category;
  const brand = req.params.brand;

  try {
    const products = await Product.find({ 'category_id': category }).find({ 'brand.name': brand });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.searchByNameCategoryAndBrand = async (req, res) => {
  const name = req.params.name;
  const category = req.params.category;
  const brand = req.params.brand;

  try {
    const products = await Product.find({ 'name': name, 'category_id': category, 'brand.name': brand });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.searchByNameSubcategoryAndBrand = async (req, res) => {
  const name = req.params.name;
  const subcategory = req.params.subcategory;
  const brand = req.params.brand;

  try {
    const products = await Product.find({ 'name': name, 'sub_category': subcategory, 'brand.name': brand });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.searchProductsBySubcategoryAndBrand = async (req, res) => {
  const subcategory = req.params.subcategory;
  const brand = req.params.brand;

  try {
    const products = await Product.find({ 'sub_category': subcategory }).find({ 'brand.name': brand });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.updateProductStock = async (req, res) => {
  const updates = req.body;

  if (!Array.isArray(updates)) {
    return res.status(400).json({ error: 'El cuerpo de la solicitud debe ser un array.' });
  }

  try {
    // Crete a promesise for individual stock update
    const updatePromises = updates.map(async ({ productId, quantity }) => {
      console.log(`Proccesing update for the product with ID ${productId} and quantity ${quantity}`);

      // Verify if the product exists and if this have suficient stock
      const result = await Product.findOne({ id: productId });

      if (!result) {
        console.error(`Producto with ID ${productId} not found`);
        throw new Error(`Product with ID ${productId} not found`);
      }

      if (result.stock < quantity) {
        console.error(`Insuficient stock for the product with ID ${productId}.`);
        throw new Error(`Insuficient stock for the product with ID ${productId}.`);
      }

      // Update the stock and total_sold
      const updateResult = await Product.updateOne(
        { id: productId },
        { 
          $inc: { 
            stock: -quantity, // $inc is used to decrease the stock
            total_sold: +quantity // $inc is used to increase the total_sold
          } 
        }
      );

      if (updateResult.nModified === 0) {
        console.error(`Can't update the product with ID ${productId}.`);
        throw new Error(`Can't update the product with ID ${productId}.`);
      }

      console.log(`Stock and total_sold updated for the product with ID ${productId}.`);
    });

    // Execute all promises
    await Promise.all(updatePromises);
    
    res.status(200).json({ message: 'Stock and total_sold has been updated correctly.' });
  } catch (error) {
    console.error('Error en la actualización de stock:', error);
    res.status(500).json({ error: error.message });
  }
};
