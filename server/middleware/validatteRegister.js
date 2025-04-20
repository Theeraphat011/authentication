const { body } = require("express-validator");

const registerValidation = [
   body("username").notEmpty().withMessage("Please enter your username"),
   body("email").isEmail().withMessage("Invalid email"),
   body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 charactors"),
];

module.exports = {registerValidation}