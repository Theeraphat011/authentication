const express = require("express");
const {
   register,
   login,
   refreshToken,
} = require("../controllers/authController");
const { registerValidation } = require("../middleware/validatteRegister");
const router = express.Router();

router.post("/register", registerValidation, register);
router.post("/login", login);
router.post("/refreshToken", refreshToken);

module.exports = router;
