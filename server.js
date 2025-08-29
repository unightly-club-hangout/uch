const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000; // Or any other port you prefer

app.use(cors());
app.use(express.json()); // Enable JSON parsing

// MongoDB connection string (replace with your actual connection string)
const mongoURI = 'mongodb+srv://UnightlyClubHangout:Mastermaster3rd@uch.ogenkeq.mongodb.net/';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Define a schema for your posts
const postSchema = new mongoose.Schema({
  text: String,
  mediaUrl: String,
  mediaType: String,
  userName: String,
  userPicture: String,
  date: { type: Date, default: Date.now } // Added date field
});

const Post = mongoose.model('Post', postSchema);

// API endpoint to create a new post
app.post('/posts', async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    console.log('New post saved:', savedPost);
    res.status(201).json(savedPost);
  } catch (err) {
    console.error('Error saving post:', err);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// API endpoint to get all posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }); // Sort by date descending
    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// API endpoint to delete a post
app.delete('/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    await Post.findByIdAndDelete(postId);
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});