const mongoose = require("mongoose");

const connectDB = () => {
   try {
      mongoose.connect(process.env.mongoDB);
      console.log("Success connceted.");
   } catch (err) {
      console.log(err);
   }
};

module.exports = connectDB;
