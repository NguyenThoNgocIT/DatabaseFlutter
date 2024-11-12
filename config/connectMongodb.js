import { connect } from "mongoose";

// Cấu hình MongoDB và JWT
const config = {
  mongoURI: "mongodb://localhost:27017/user",
  jwtSecret: "your_jwt_secret_key",
  port: 5000,
};

// Kết nối MongoDB
const connectDB = async () => {
  try {
    await connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
    process.exit(1); // Exit process with failure
  }
};

// Xuất đối tượng chứa config và connectDB
export default { config, connectDB };
