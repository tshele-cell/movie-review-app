import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MovieSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const searchMovies = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`http://localhost:5000/api/movies/search?query=${encodeURIComponent(searchQuery)}`);
      setMovies(response.data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setError('Failed to search movies. Please try again.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const getPopularMovies = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get('http://localhost:5000/api/movies/popular');
      setMovies(response.data.results || []);
    } catch (error) {
      console.error('Popular movies error:', error);
      setError('Failed to load popular movies.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const reviewThisMovie = (movie) => {
    // Navigate to Add Review page with movie data pre-filled
    navigate('/add-review', { 
      state: { 
        preFilledMovie: movie.title 
      } 
    });
  };

  return (
    <div className="container mt-4">
      <h2> Browse Movies</h2>
      
      {/* Search Form */}
      <div className="row mb-4">
        <div className="col-md-8">
          <form onSubmit={searchMovies}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search for movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                className="btn btn-primary" 
                type="submit"
                disabled={loading}
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-4">
          <button 
            className="btn btn-outline-secondary w-100"
            onClick={getPopularMovies}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Show Popular Movies'}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Movies Grid */}
      <div className="row">
        {movies.map(movie => (
          <div key={movie.id} className="col-md-4 mb-4">
            <div className="card h-100 movie-card">
              <img 
                src={movie.poster_path 
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : '/placeholder-movie.jpg'
                } 
                className="card-img-top"
                alt={movie.title}
                style={{ height: '400px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDIwMCAzMDAiIGZpbGw9IiNmMmYyZjIiPjx0ZXh0IHg9IjEwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTk5OTkiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text flex-grow-1">
                  {movie.overview ? (
                    movie.overview.length > 150 
                      ? `${movie.overview.substring(0, 150)}...` 
                      : movie.overview
                  ) : 'No description available.'}
                </p>
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-primary">
                      ⭐ {movie.vote_average?.toFixed(1)}/10
                    </span>
                    <span className="text-muted">
                      {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                    </span>
                  </div>
                  <button 
                    className="btn btn-success btn-sm w-100"
                    onClick={() => reviewThisMovie(movie)}
                  >
                    📝 Review This Movie
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {movies.length === 0 && !loading && !error && (
        <div className="text-center text-muted mt-5">
          <h5>No movies found</h5>
          <p>Search for movies or click "Show Popular Movies" to get started.</p>
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center mt-4">
          <div className="loading-spinner"></div>
          <p className="mt-2">Loading movies...</p>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;