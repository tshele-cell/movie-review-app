import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  // Sample data with the names you want
  const sampleReviews = [
    {
      id: 1,
      user: "Tshele Lebajoa",
      movieTitle: "Black Panther: Wakanda Forever",
      rating: 5,
      comment: "An emotional and powerful sequel that honors Chadwick Boseman's legacy while expanding the Wakandan universe beautifully.",
      createdAt: new Date('2024-01-15')
    },
    {
      id: 2,
      user: "Thabo Sekupu", 
      movieTitle: "Spider-Man: Across the Spider-Verse",
      rating: 4,
      comment: "Visually stunning animation and creative storytelling. The multiverse concept was handled brilliantly!",
      createdAt: new Date('2024-01-12')
    },
    {
      id: 3,
      user: "Tshidi Setoromo",
      movieTitle: "The Woman King",
      rating: 5,
      comment: "Viola Davis delivers a powerhouse performance! The action sequences were intense and the historical context was educational.",
      createdAt: new Date('2024-01-08')
    }
  ];

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/reviews');
      // If no reviews from backend, use sample data
      if (response.data.length === 0) {
        setReviews(sampleReviews);
      } else {
        setReviews(response.data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      // If API fails, use sample data
      setReviews(sampleReviews);
    }
  };

  const deleteReview = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/reviews/${id}`);
      fetchReviews(); // Refresh the list
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>📝 All Reviews</h2>
      {reviews.length === 0 ? (
        <div className="alert alert-info">
          <p>No reviews yet. Be the first to add one!</p>
        </div>
      ) : (
        <div className="row">
          {reviews.map(review => (
            <div key={review.id || review._id} className="col-md-6 mb-3">
              <div className="card review-card">
                <div className="card-body">
                  <h5 className="card-title movie-title">{review.movieTitle}</h5>
                  <div className="mb-2">
                    <strong>Rating:</strong> 
                    <span className="rating">
                      {' ★'.repeat(review.rating)}
                      {' ☆'.repeat(5 - review.rating)}
                    </span>
                    ({review.rating}/5)
                  </div>
                  <p className="card-text">{review.comment}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted reviewer-name">
                      👤 By: {review.user} • 📅 {new Date(review.createdAt).toLocaleDateString()}
                    </small>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteReview(review.id || review._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;