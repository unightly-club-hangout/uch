const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json()); // Add this line to parse JSON request bodies

// GitHub raw link for user status data
const githubRawLink = 'https://raw.githubusercontent.com/silentmason/UCH-Website/refs/heads/master/Status';

// Function to fetch user data from GitHub raw link
async function fetchUserDataFromGithub() {
  try {
    const response = await axios.get(githubRawLink);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data from GitHub:', error);
    return null;
  }
}

let users = {}; // Initialize users object

// Initialize user data from GitHub on server start
(async () => {
  users = await fetchUserDataFromGithub() || {};
})();

// Middleware to simulate authentication (replace with your actual authentication)
const authenticate = (req, res, next) => {
  const userId = req.headers['user-id'];

  if (!userId || !users[userId]) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  req.user = {
    id: userId,
    // ... other user information
  };
  next();
};

// API endpoint to get user status
app.get('/api/user/status', authenticate, async (req, res) => {
  const userId = req.user.id;
  const status = users[userId];

  if (!status) {
    return res.status(404).json({ message: 'User status not found' });
  }

  res.json(status);
});

// API endpoint to update user status
app.post('/api/user/updateStatus', authenticate, async (req, res) => {
  const userId = req.user.id;
  const {
    username,
    status,
    warnings,
    notes
  } = req.body;

  if (!username || !status || !warnings || !notes) {
    return res.status(400).json({
      message: 'Missing required fields'
    });
  }

  // Update user status
  users[userId] = {
    username,
    status,
    warnings,
    notes
  };

  // Re-fetch data from github
  users = await fetchUserDataFromGithub() || {};

  res.json({
    message: 'User status updated successfully'
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});