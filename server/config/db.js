const mongoose = require("mongoose");

const connectDB = () => {
   try {
      mongoose.connect(process.env.mongoDB, {
         serverSelectionTimeoutMS: 30000,
         socketTimeoutMS: 30000,
         ssl: true,
      });
      console.log("Success connceted.");
   } catch (err) {
      console.log(err);
   }
};

module.exports = connectDB;
