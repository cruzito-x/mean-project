const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

router.get("/", productsController.getAllProducts);
router.get("/bestRated", productsController.getBestRatedProducts);
router.get("/category/:id", productsController.getProductsByCategory);
router.get("/details/:id", productsController.getProductDetails);
router.get("/brand/:brand", productsController.getProductsByBrand);
router.get("/subcategory/:subcategory", productsController.getProductsByFamily);
router.get("/products/offers", productsController.getProductsOffers);
router.get("/search/:name", productsController.searchProductsByName);
router.get("/search/category/:category/brand/:brand", productsController.searchProductsByCategoryAndBrand);
router.get("/search/name/:name/category/:category/brand/:brand", productsController.searchByNameCategoryAndBrand);
router.get("/search/name/:name/subcategory/:subcategory/brand/:brand", productsController.searchByNameSubcategoryAndBrand);
router.get("/search/subcategory/:subcategory/brand/:brand", productsController.searchProductsBySubcategoryAndBrand);
router.post("/stock", productsController.updateProductStock);

module.exports = router;
