const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

import userRoutes from "./routes/userRoutes.js";
import { connectDB, config } from "./config/connectMongodb.js";

// Kết nối DB
connectDB();

// Sử dụng config
console.log(config.mongoURI); // Ví dụ: Sử dụng URI MongoDB từ config
// Create an Express app
const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Static file serving for uploads
app.use("/uploads", express.static("uploads"));

// Route for user-related functionality
app.use("/user", userRoutes);

// Root route
app.get("/", (req, res) => res.send("API is running..."));

// Connect to MongoDB
connectDB();

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
