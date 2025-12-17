console.log("✅ mustWatch router loaded");

import express from 'express';
import asyncHandler from 'express-async-handler';
import MustWatch from './mustWatchmodel.js';
import { getMovie } from '../tmdb-api.js';

const router = express.Router(); // eslint-disable-line

router.get('/',
    asyncHandler(async (req, res) => {
        const watchlist = await MustWatch.find({ userId: req.user._id });
        res.status(200).json(watchlist);
    }));

// Add a movie to watchlist
router.post("/:movieId",
    asyncHandler(async (req, res) => {
        const movieId = Number(req.params.movieId);
        const movie = await getMovie(movieId);
        const watchlist = await MustWatch.findOneAndUpdate(
            { userId: req.user._id, movieId },
            {
                userId: req.user._id,
                movieId,
                title: movie.title,
                releaseDate: movie.release_date,
                posterPath: movie.poster_path
            },
            { upsert: true, new: true, runValidators: true }
        );
        res.status(201).json(watchlist);
    }));
    
// Remove a movie from watchlist
router.delete("/:movieId",
    asyncHandler(async (req, res) => {
        const movieId = Number(req.params.movieId);
        const watchlist = await MustWatch.deleteOne({ userId: req.user._id, movieId });
        res.status(200).json(watchlist);
    }));

export default router;