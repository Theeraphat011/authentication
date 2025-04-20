const jwt = require("jsonwebtoken");

exports.generateAccessToken = (user) => {
   return jwt.sign({ id: user._id, emil: user.emil }, process.env.JWT_SECRET, {
      expiresIn: "15m",
   });
};

exports.generateRefreshToken = (user) => {
   return jwt.sign({ id: user._id}, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
   });
};
