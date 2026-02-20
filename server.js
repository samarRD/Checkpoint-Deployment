// server.js
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const User = require("./models/User");

const app = express();

// Middleware pour lire le JSON
app.use(express.json());

// Connexion à la base de données
connectDB();

/* =========================
   ROUTES API REST
========================= */

// ✅ GET — retourner tous les utilisateurs
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ POST — ajouter un nouvel utilisateur
app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ PUT — modifier un utilisateur par ID
app.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }, // Mongoose récent
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ DELETE — supprimer un utilisateur par ID
app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Lancer le serveur
app.listen(process.env.PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${process.env.PORT}`);
});
