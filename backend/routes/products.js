const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

router.get("/", productsController.getAllProducts);
router.get("/bestRated", productsController.getBestRatedProducts);

module.exports = router;
