const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const UserModel = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors());

// Use 127.0.0.1 to avoid potential 'localhost' resolution issues
mongoose.connect("mongodb://127.0.0.1:27017/PrompToolDB")
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.error("MongoDB Connection Error:", err));

app.post('/users', (req, res) => {
    console.log("📥 Received Data:", req.body); // Check if data arrived

    UserModel.create(req.body)
        .then(user => {
            console.log("👤 User Created:", user);
            res.status(201).json(user);
        })
        .catch(err => {
            console.error(" Database Error:", err); // Look at your terminal for this!
            res.status(400).json({ error: err.message });
        });
});

app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
});