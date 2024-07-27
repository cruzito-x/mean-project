const Categories = require("../models/categoriesModel");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Path: controllers/categoriesController.js

exports.getMostPopularCategories = async (req, res) => {
  try {
    const categories = await Categories.find().limit(5).sort({'total_sold': -1}); // Step 1: Get all categories sorted by total_sold

    const processedCategories = categories.map(category => { // Step 2: Process each category and its subcategories
      const subcategories = category.subcategories.map(subcategory => {
        const sortedSubSubcategories = subcategory.subcategories.sort((a, b) => b.total_sold - a.total_sold); // Step 3: Sort sub-subcategories by total_sold in descending order
        const topSubSubcategory = sortedSubSubcategories[0]; // Step 4: Select the top sub-subcategory
        
        return { // Return the subcategory with only the top sub-subcategory
          ...subcategory._doc, // Spread the subcategory document properties
          subcategories: [topSubSubcategory] // Only include the top sub-subcategory
        };
      });

      return { // Return the category with processed subcategories
        ...category._doc, // Spread the category document properties
        subcategories // Include the processed subcategories
      };
    });

    res.status(200).json(processedCategories); // Step 5: Return the processed categories
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
