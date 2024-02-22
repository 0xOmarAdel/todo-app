const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authMiddleware");

const {
  register,
  login,
  validateToken,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/validateToken", authenticateUser, validateToken);

module.exports = router;
