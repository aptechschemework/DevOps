const express = require("express");

const app = express();

app.use(express.json());

let users = [
  {
    id: 1,
    name: "John",
    email: "john@example.com",
  },
];

// Get all users
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

// Get user by ID
app.get("/users/:id", (req, res) => {
  const user = users.find(
    (user) => user.id === Number(req.params.id)
  );

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json(user);
});

// Create user
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: "Name and email are required",
    });
  }

  const user = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(user);

  res.status(201).json(user);
});

module.exports = app;