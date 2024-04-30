import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getMovieCredits, getMovieReviews } from './Api';
import Cast from './Cast';
import Reviews from './Reviews';
import 'index.css';

const MovieDetails = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showCast, setShowCast] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      const movieDetails = await getMovieDetails(movieId);
      setMovie(movieDetails);
      const castData = await getMovieCredits(movieId);
      setCast(castData);
      const reviewsData = await getMovieReviews(movieId);
      setReviews(reviewsData);
    };
    fetchMovieData();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  const getPosterUrl = () => {
    if (movie.poster_path) {
      return `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    } else {
      return '/placeholder-movie-poster.jpg'; 
    }
  };

  const handleShowCast = () => {
    setShowCast(!showCast);
  };

  const handleShowReviews = () => {
    setShowReviews(!showReviews);
  };

  const handleBackToMainMenu = () => {
    navigate('/');
  };

  return (
    <div>
      <button className="back-button" onClick={handleBackToMainMenu}>
        Back to Main Menu
      </button>
      <div className="movie-details">
        <img src={getPosterUrl()} alt={movie.title} className="movie-poster" />{' '}
        {/* Imagen de la película */}
        <div className="text">
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
        </div>
      </div>
      <div className="buttons-container">
        <button onClick={handleShowCast}>Show Cast</button>
        <button onClick={handleShowReviews}>Show Reviews</button>
      </div>
      {showCast && <Cast cast={cast} />}
      {showReviews && <Reviews reviews={reviews} />}
    </div>
  );
};

export default MovieDetails;
