import express from 'express';
import {
  getMovies, getMovie, getMovieImages, getUpcomingMovies,getGenres, getPopularMovies, getNowPlayingMovies, getMovieReviews
} from '../tmdb-api';
import asyncHandler from 'express-async-handler';
import FavoriteMovie from '../favourite/favmodel';
const router = express.Router();
router.get('/discover', asyncHandler(async (req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
}));
router.get('/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));
router.get('/genres', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));
router.get('/popular', asyncHandler(async (req, res) => {
    const popularMovies = await getPopularMovies();
    res.status(200).json(popularMovies);
}));
router.get('/now_playing', asyncHandler(async (req, res) => {
    const nowPlayingMovies = await getNowPlayingMovies();
    res.status(200).json(nowPlayingMovies);
}));


router.get('/', asyncHandler(async (req, res) => {
  const movies = await getMovies();
  res.status(200).json(movies);
}));

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
  const movie = await getMovie(req.params.id);
  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(404).json({ message: 'The resource you requested could not be found.', status_code: 404 });
  }
}));

// Get movie images
router.get('/:id/images', asyncHandler(async (req, res) => {
  const movieImages = await getMovieImages(req.params.id);
  if (movieImages) {
    res.status(200).json(movieImages);
  } else {
    res.status(404).json({ message: 'The resource you requested could not be found.', status_code: 404 });
  }
}));
/* This particular route handler is responsible for retrieving details of a specific movie based on the
`id` parameter provided in the URL. Here's a breakdown of what it does: */
router.get('/:id', asyncHandler(async (req, res) => {
  const movieId = Number(req.params.id);
  const movie = await getMovie(movieId);

  if (!movie) {
    return res.status(404).json({ 
      message: 'The resource you requested could not be found.', 
      status_code: 404 
    });
  }

  let isFavorite = false;

  if (req.user) {   // Only if user is logged in
    const fav = await FavoriteMovie.findOne({
      userId: req.user._id,
      movieId,
    });
    isFavorite = !!fav;
  }

  res.status(200).json({
    ...movie,
    isFavorite,   
  });
}));
//get movie reviews
router.get('/:id/reviews', asyncHandler(async (req, res) => {
  const movieReviews = await getMovieReviews(req.params.id);
  if (movieReviews) {
    res.status(200).json(movieReviews);
  } else {
    res.status(404).json({
      message: 'The resource you requested could not be found.',
      status_code: 404
    });
  }
}));
//similar movies
router.get('/:id/similar', asyncHandler(async (req, res) => {
  const similarMovies = await getMovies({
    with_similar_movies: req.params.id,
    page: 1,
    language: 'en-US'
  });
  if (similarMovies) {
    res.status(200).json(similarMovies);
  } else {
    res.status(404).json({
      message: 'The resource you requested could not be found.',
      status_code: 404
    });
  }
}));
//Credit
router.get('/:id/credits', asyncHandler(async (req, res) => {
  const movieCredits = await getMovies({
    with_cast: req.params.id,
    page: 1,
    language: 'en-US'
  });
  if (movieCredits) {
    res.status(200).json(movieCredits);
  } else {
    res.status(404).json({
      message: 'The resource you requested could not be found.',
      status_code: 404
    });
  }
}));

export default router;
