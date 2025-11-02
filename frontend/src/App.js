import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ReviewList from './components/ReviewList';
import AddReview from './components/AddReview';
import MovieSearch from './components/MovieSearch';
import './App.css';

// Home Component
function Home() {
  return (
    <div className="container mt-5">
      <div className="jumbotron bg-light p-5 rounded">
        <h1 className="display-4">🎬 Welcome to Lebajoa's Movie Review Platform</h1>
        <p className="lead">Discover, review, and share your thoughts on movies!</p>
        <hr className="my-4" />
        <p>Read honest reviews from other movie lovers or share your own experiences.</p>
        <div className="mt-4">
          <Link className="btn btn-primary btn-lg" to="/movies">
            🎭 Browse Movies
          </Link>
          <Link className="btn btn-success btn-lg ms-2" to="/add-review">
            ⭐ Add Your Review
          </Link>
          <Link className="btn btn-outline-secondary btn-lg ms-2" to="/reviews">
            📝 See All Reviews
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="row mt-5">
        <div className="col-md-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h3>🎭</h3>
              <h5 className="card-title">Browse Movies</h5>
              <p className="card-text">Search from thousands of movies using our integrated movie database.</p>
              <Link to="/movies" className="btn btn-outline-primary">Explore Movies</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h3>⭐</h3>
              <h5 className="card-title">Write Reviews</h5>
              <p className="card-text">Share your thoughts and rate movies you've watched.</p>
              <Link to="/add-review" className="btn btn-outline-success">Write Review</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h3>👥</h3>
              <h5 className="card-title">Read Reviews</h5>
              <p className="card-text">See what other movie enthusiasts think about different films.</p>
              <Link to="/reviews" className="btn btn-outline-info">Read Reviews</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// About Component
function About() {
  return (
    <div className="container mt-5 about-page">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <h1>🎭 Our Movie Reviews</h1>
          <div className="card">
            <div className="card-body">
              <p className="lead">
                Movie reviews help us discover cinematic gems and share our passion for storytelling through film.
              </p>
              
              <h5>⭐ Why Review Movies?</h5>
              <ul className="list-group list-group-flush mb-3">
                <li className="list-group-item">🎬 Share your unique perspective on films</li>
                <li className="list-group-item">👥 Help others discover great movies</li>
                <li className="list-group-item">💭 Express how a movie made you feel</li>
                <li className="list-group-item">🏆 Celebrate outstanding performances and direction</li>
                <li className="list-group-item">📈 Track your movie-watching journey</li>
              </ul>

              <h5>🎯 What Makes a Great Review?</h5>
              <div className="row">
                <div className="col-md-6">
                  <strong>Essential Elements:</strong>
                  <ul>
                    <li>Honest personal opinion</li>
                    <li>Analysis of acting and direction</li>
                    <li>Discussion of emotional impact</li>
                    <li>Fair rating system</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <strong>Community Values:</strong>
                  <ul>
                    <li>Respectful discussions</li>
                    <li>Diverse perspectives</li>
                    <li>Constructive criticism</li>
                    <li>Shared love for cinema</li>
                  </ul>
                </div>
              </div>

              <h5>🎬 Join Our Community</h5>
              <p>Whether you're a casual viewer or a film enthusiast, your voice matters. Share your thoughts and discover new perspectives from fellow movie lovers.</p>

              <div className="alert alert-info mt-3">
                <strong>🎉 Happy Reviewing!</strong> Your insights help build a vibrant community of film enthusiasts.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">
              🎬 MovieReviews
            </Link>
            
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarNav">
              <div className="navbar-nav ms-auto">
                <Link className="nav-link" to="/">
                  🏠 Home
                </Link>
                <Link className="nav-link" to="/movies">
                  🎭 Movies
                </Link>
                <Link className="nav-link" to="/reviews">
                  📝 Reviews
                </Link>
                <Link className="nav-link" to="/add-review">
                  ⭐ Add Review
                </Link>
                <Link className="nav-link" to="/about">
                  ℹ️ About
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<MovieSearch />} />
            <Route path="/reviews" element={<ReviewList />} />
            <Route path="/add-review" element={<AddReview />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-dark text-light mt-5 py-4">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h5>🎬Lebajoa's Movie Review Platform</h5>
                <p>Share your movie experiences with the world. 🍿</p>
              </div>
              <div className="col-md-6 text-md-end">
                <p>&copy; 2024 Movie Reviews.</p>
                <p>Join our community of film lovers! ❤️</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;