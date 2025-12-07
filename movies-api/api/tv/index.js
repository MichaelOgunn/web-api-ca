
import express from 'express';
import asyncHandler from 'express-async-handler';
import { getPopularTV, getTVShow } from '../tmdb-api';

const router = express.Router();

// Get popular TV shows
router.get('/popular', asyncHandler(async (req, res) => {
    const popularTV = await getPopularTV();
    res.status(200).json(popularTV);
}));

// Get TV show details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const tvShow = await getTVShow(id);
    if (tvShow) {
        res.status(200).json(tvShow);
    } else {
        res.status(404).json({ message: 'The resource you requested could not be found.', status_code: 404 });
    }
}));

export default router;
