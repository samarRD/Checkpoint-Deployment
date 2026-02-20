// models/User.js
const mongoose = require("mongoose");

// Schéma utilisateur
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // obligatoire
  },
  email: {
    type: String,
    required: true,
    unique: true, // email unique
  },
  age: {
    type: Number,
    default: 18,
  },
});

// Export du modèle
module.exports = mongoose.model("User", userSchema);
