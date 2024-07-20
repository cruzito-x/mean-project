const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

router.get("/", productsController.getAllProducts);
router.get("/bestRated", productsController.getBestRatedProducts);
router.get("/category/:id", productsController.getProductsByCategory);
router.get("/details/:id", productsController.getProductDetails);
router.get("/brand/:brand", productsController.getProductsByBrand);
router.get("/family/:family", productsController.getProductsByFamily);
router.get("/products/offers", productsController.getProductsOffers);

module.exports = router;
