import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const AddReview = () => {
  const [formData, setFormData] = useState({
    movieTitle: '',
    rating: 5,
    comment: '',
    user: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.preFilledMovie) {
      setFormData(prev => ({
        ...prev,
        movieTitle: location.state.preFilledMovie
      }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('Sending review data:', formData);
      const response = await axios.post('http://localhost:5000/api/reviews', formData);
      console.log('Response:', response.data);
      
      alert('🎉 Review added successfully!');
      setFormData({ movieTitle: '', rating: 5, comment: '', user: '' });
      navigate('/reviews');
    } catch (error) {
      console.error('Full error details:', error);
      console.error('Error response:', error.response);
      alert(`❌ Error adding review: ${error.message}. Check console for details.`);
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setFormData({
      movieTitle: '',
      rating: 5,
      comment: '',
      user: ''
    });
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">✍️ Write a Movie Review</h3>
            </div>
            <div className="card-body">
              {location.state?.preFilledMovie && (
                <div className="alert alert-info">
                  <strong>Movie pre-filled from search!</strong> You're reviewing: <em>{location.state.preFilledMovie}</em>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">
                    <strong>Your Name:</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="user"
                    value={formData.user}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    <strong>Movie Title:</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="movieTitle"
                    value={formData.movieTitle}
                    onChange={handleChange}
                    required
                    placeholder="Enter movie title"
                  />
                  <div className="form-text">
                    Pro tip: Search for movies on the "Movies" page and click "Review This Movie" to auto-fill this field!
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    <strong>Rating:</strong>
                  </label>
                  <select
                    className="form-select"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                  >
                    <option value="1">1 Star ★☆☆☆☆</option>
                    <option value="2">2 Stars ★★☆☆☆</option>
                    <option value="3">3 Stars ★★★☆☆</option>
                    <option value="4">4 Stars ★★★★☆</option>
                    <option value="5">5 Stars ★★★★★</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    <strong>Your Review:</strong>
                  </label>
                  <textarea
                    className="form-control"
                    name="comment"
                    rows="5"
                    value={formData.comment}
                    onChange={handleChange}
                    placeholder="Share your thoughts about the movie... What did you like? What could be better?"
                    required
                  ></textarea>
                </div>

                <div className="d-flex gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-primary flex-fill"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Adding Review...
                      </>
                    ) : (
                      '✅ Submit Review'
                    )}
                  </button>
                  
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary"
                    onClick={clearForm}
                    disabled={loading}
                  >
                    🗑️ Clear
                  </button>
                  
                  <button 
                    type="button" 
                    className="btn btn-outline-info"
                    onClick={() => navigate('/movies')}
                  >
                    🔍 Find Movies
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
