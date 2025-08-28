const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/uch', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Post Schema
const postSchema = new mongoose.Schema({
  text: String,
  mediaUrl: String,
  mediaType: String,
  userName: String,
  userPicture: String
});

const Post = mongoose.model('Post', postSchema);

// POST /posts endpoint
app.post('/posts', async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// DELETE /posts/:id endpoint
app.delete('/posts/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});