require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const User = require("./models/User");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware JSON
app.use(express.json());

// CORS (local uniquement)
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production" ? false : "http://localhost:3001",
  }),
);

// Connexion MongoDB
connectDB();

/* =========================
   ROUTES API
========================= */

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* =========================
   FRONTEND REACT
========================= */

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "public/build")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/build", "index.html"));
  });
}

// Serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
