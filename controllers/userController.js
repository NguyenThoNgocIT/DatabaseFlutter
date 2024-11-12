const users = require("../models/users.model.js");

const usersController = {
  // Các hàm hiện tại
  getUsers: async (req, res) => {
    try {
      const userss = await users.find();
      res.status(200).json(userss);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching users", error: err.message });
    }
  },

  createUsers: async (req, res) => {
    try {
      const { email, name, password } = req.body;
      const existingUser = await users.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
      const newUser = new users({ email, name, password });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error creating user", error: err.message });
    }
  },

  deleteAllUsers: async (req, res) => {
    try {
      const result = await users.deleteMany({});
      res
        .status(200)
        .json({ message: "All users deleted successfully", result });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error deleting all users", error: err.message });
    }
  },

  updateUser: async (req, res) => {
    const userId = req.params.id;
    const { email, name, password } = req.body;

    try {
      const updatedUser = await users.findByIdAndUpdate(
        userId,
        { email, name, password },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(updatedUser);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error updating user", error: err.message });
    }
  },

  deleteUser: async (req, res) => {
    const userId = req.params.id;

    try {
      const deletedUser = await users.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error deleting user", error: err.message });
    }
  },
};

module.exports = usersController;
