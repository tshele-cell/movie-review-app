const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// TMDB API Configuration
const TMDB_API_KEY = '9649212ff94616cc0fdd2161f023440a'; // ← REPLACE WITH YOUR ACTUAL API KEY
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Temporary in-memory storage
let reviews = [
  {
    id: '1',
    movieTitle: 'Spider-Man: Across the Spider-Verse',
    rating: 5,
    comment: 'Visually stunning animation and creative storytelling. The multiverse concept was handled brilliantly!',
    user: 'Thabo Sekupu',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2', 
    movieTitle: 'Black Panther: Wakanda Forever',
    rating: 4,
    comment: 'An emotional and powerful sequel that honors Chadwick Bosemans legacy while expanding the Wakandan universe beautifully.',
    user: 'Tshele Lebajoa',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
    {
    id: '3', 
    movieTitle: 'The Woman King',
    rating: 4,
    comment: 'Viola Davis delivers a powerhouse performance! The action sequences were intense and the historical context was educational.',
    user: 'Tshidi Setoromo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Movie Review API is running!' });
});

// GET all reviews
app.get('/api/reviews', (req, res) => {
  try {
    const sortedReviews = reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(sortedReviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single review
app.get('/api/reviews/:id', (req, res) => {
  try {
    const review = reviews.find(r => r.id === req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new review
app.post('/api/reviews', (req, res) => {
  try {
    const { movieTitle, rating, comment, user } = req.body;
    
    console.log('Received data:', req.body);
    
    if (!movieTitle || !rating || !user) {
      return res.status(400).json({ error: 'Missing required fields: movieTitle, rating, user' });
    }

    const newReview = {
      id: Date.now().toString(),
      movieTitle: movieTitle.trim(),
      rating: parseInt(rating),
      comment: comment ? comment.trim() : '',
      user: user.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    reviews.push(newReview);
    console.log('Review added:', newReview);
    res.status(201).json(newReview);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

// DELETE review
app.delete('/api/reviews/:id', (req, res) => {
  try {
    const index = reviews.findIndex(r => r.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    reviews = reviews.filter(review => review.id !== req.params.id);
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== MOVIE API ROUTES ==========

// Search movies
app.get('/api/movies/search', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query: query,
        language: 'en-US',
        page: 1,
        include_adult: false
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('TMDB API error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to fetch movies from TMDB',
      details: error.response?.data || error.message
    });
  }
});

// Get popular movies
app.get('/api/movies/popular', async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US',
        page: 1
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('TMDB API error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to fetch popular movies',
      details: error.response?.data || error.message
    });
  }
});

// Get movie details by ID
app.get('/api/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('TMDB API error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to fetch movie details',
      details: error.response?.data || error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📝 API endpoints available:`);
  console.log(`   GET  http://localhost:${PORT}/api/reviews`);
  console.log(`   POST http://localhost:${PORT}/api/reviews`);
  console.log(`   GET  http://localhost:${PORT}/api/movies/search?query=avengers`);
  console.log(`   GET  http://localhost:${PORT}/api/movies/popular`);
});