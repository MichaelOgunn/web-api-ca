import express from 'express';
import asyncHandler from 'express-async-handler';
import FavoriteMovie from './favmodel.js';
import { getMovie } from '../tmdb-api.js';

const router = express.Router();

// Get ALL favourite movies (no user separation)
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const favorites = await FavoriteMovie.find();
    res.status(200).json(favorites);
  })
);

// Get favourites for a specific user (optional, can ignore for now)
router.get(
  '/user/:uid',
  asyncHandler(async (req, res) => {
    const favorites = await FavoriteMovie.find({ userId: req.params.uid });
    res.status(200).json(favorites);
  })
);

// Add a movie to favourites (no auth, global)
router.post(
  '/:movieId',
  asyncHandler(async (req, res) => {
    const movieId = Number(req.params.movieId);
    const movie = await getMovie(movieId);

    // upsert so we don't get duplicates for the same movieId
    const favorite = await FavoriteMovie.findOneAndUpdate(
      { movieId },
      {
        movieId,
        title: movie.title,
        posterPath: movie.poster_path,
        releaseDate: movie.release_date,
        // userId: null  // optional, since we're not using user yet
      },
      { upsert: true, new: true }
    );

    res.status(201).json(favorite);
  })
);

// Remove a movie from favourites (no auth)
router.delete(
  '/:movieId',
  asyncHandler(async (req, res) => {
    const movieId = Number(req.params.movieId);

    const result = await FavoriteMovie.deleteOne({ movieId });

    if (result.deletedCount) {
      res.status(204).json();
    } else {
      res.status(404).json({ msg: 'Favourite not found' });
    }
  })
);

export default router;
