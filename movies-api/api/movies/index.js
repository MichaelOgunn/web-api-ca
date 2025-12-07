import express from 'express';
import {
  getMovies, getMovie, getMovieImages, getUpcomingMovies,getGenres, getPopularMovies, getNowPlayingMovies
} from '../tmdb-api';
import asyncHandler from 'express-async-handler';

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


export default router;
