require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

connectDB();
app.listen(process.env.PORT, () => {
   console.log("http://localhost:3000");
});
