const express = require("express");
const router = express.Router();
const brandsController = require("../controllers/brandsController");

router.get("/", brandsController.getAllBrands);
router.get("/search/:name", brandsController.searchBrandByName);

module.exports = router;