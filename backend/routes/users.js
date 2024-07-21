const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.get("/details", authMiddleware, usersController.getDetails);
router.put("/update/:token", authMiddleware, usersController.updateUser);
router.delete("/delete/:token", authMiddleware, usersController.deleteUser);

module.exports = router;