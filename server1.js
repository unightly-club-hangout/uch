const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const dbURI = 'mongodb+srv://UnightlyClubHangout:Mastermaster3rd@uch.ogenkeq.mongodb.net/'; // Replace with your MongoDB URI
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a Mongoose Schema and Model
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String }, // Removed required: true
    createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

// API Endpoints

// Get all posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }); // Sort by creation date, newest first
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Create a new post
app.post('/posts/', async (req, res) => {
    try {
        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost); // Send the saved post back in the response
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.delete('/posts/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;  // Get the post ID from the URL
        await Post.findByIdAndDelete(postId); // Delete the post from MongoDB
        res.json({ message: 'Post deleted successfully' }); // Send a JSON response
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' }); // Send a JSON error response
    }
});

// Start the server
app.listen(port,'0.0.0.0', () => {
    console.log(`Server listening at http://localhost:${port}`);
});

