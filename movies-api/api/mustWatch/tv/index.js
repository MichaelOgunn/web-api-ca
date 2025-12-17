import express from 'express';
import asyncHandler from 'express-async-handler';
import MustWatchTv from './mustWatchtvmodel';
import { getTVShow } from '../../tmdb-api';
const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const mustWatchTV = await MustWatchTv.find({ userId: req.user._id });
    res.status(200).json(mustWatchTV.filter((tv) => tv.tvId === parseInt(req.params.id)));
}));
//add tv to must watch list
router.post("/:tvId", asyncHandler(async (req, res) => {
    const tvId = Number(req.params.tvId);
    const tvShow = await getTVShow(tvId);
    const mustWatchTV = await MustWatchTv.findOneAndUpdate(
        { userId: req.user._id },
        {
            userId: req.user._id,
            tvId,
            title: tvShow.name,
            overview: tvShow.overview,
            poster_path: tvShow.poster_path,
            backdrop_path: tvShow.backdrop_path,
            first_air_date: tvShow.first_air_date,
        },
        { upsert: true, new: true, runValidators: true }

    );
    res.status(201).json(mustWatchTV);

}));
//remove tv from must watch list
router.delete("/:tvId", asyncHandler(async (req, res) => {
    const tvId = Number(req.params.tvId);
    const mustWatchTV = await MustWatchTv.deleteOne({ userId: req.user._id, tvId });
    if (mustWatchTV.deletedCount) res.status(204).end();
    else res.status(404).json({ msg: "TV show not found in must watch list" });
}));

export default router;