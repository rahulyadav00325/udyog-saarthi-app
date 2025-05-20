const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create Express app
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB (Update the connection string for your environment)
mongoose.connect('mongodb://localhost:27017/signupDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB: ', err));

// User Schema
const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  username: String,
  password: String
});

// User Model
const User = mongoose.model('User', userSchema);

// Endpoint to save user data
app.post('/signup', async (req, res) => {
  const { fullname, email, username, password } = req.body;

  try {
    const newUser = new User({ fullname, email, username, password });
    await newUser.save();
    res.status(201).send({ message: 'User successfully registered!' });
  } catch (error) {
    res.status(500).send({ message: 'Error saving user', error });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
