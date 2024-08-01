const express = require("express");
const router = express.Router();
const sellsController = require("../controllers/sellsController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/save", sellsController.saveReceiptData);

module.exports = router;