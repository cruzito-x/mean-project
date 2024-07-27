const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoriesController");

router.get("/", categoriesController.getAllCategories);
router.get("/mostPopularCategories", categoriesController.getMostPopularCategories);

module.exports = router;