const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/'); // Destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Rename the file
  }
});

const upload = multer({ storage: storage });

// API endpoint for profile picture upload
app.post('/api/profile/update-image', upload.single('profile-image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image uploaded' });
  }

  // You would typically save the file path to a database associated with the user
  const imagePath = '/uploads/' + req.file.filename; // Store this path in your database

  // Here, you might also update a user's session or cookie with the new image path
  console.log('Image uploaded:', imagePath);

  res.status(200).json({ message: 'Profile picture updated successfully', imagePath: imagePath });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});