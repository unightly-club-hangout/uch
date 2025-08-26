const express = require('express');
const cors = require('cors');
const {
  Pool
} = require('pg');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// PostgreSQL Connection
const pool = new Pool({
  user: 'your_db_user',
  host: 'localhost',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432, // Default PostgreSQL port
});

// Test the database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err);
  } else {
    console.log('Connected to PostgreSQL:', res.rows[0].now);
  }
});

// API Endpoints
// 1. Get all posts
app.get('/api/posts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({
      message: 'Error fetching posts'
    });
  }
});

// 2. Create a new post
app.post('/api/posts/new', async (req, res) => {
  const {
    text,
    mediaUrl,
    mediaType,
    userName,
    userPicture
  } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO posts (text, mediaUrl, mediaType, userName, userPicture) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [text, mediaUrl, mediaType, userName, userPicture]
    );
    res.json({
      message: 'Post created successfully',
      post: result.rows[0]
    });
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({
      message: 'Error creating post'
    });
  }
});

// 3. Delete a post by ID
app.delete('/api/posts/:id', async (req, res) => {
  const {
    id
  } = req.params;
  try {
    await pool.query('DELETE FROM posts WHERE id = $1', [id]);
    res.json({
      message: 'Post deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({
      message: 'Error deleting post'
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});