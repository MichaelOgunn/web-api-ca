// api/favourite/tv/index.js
import express from "express";
import asyncHandler from "express-async-handler";
import FavouriteTv from "./favtvmodel.js";
// (optional) if you want show details, import getTvShow from your tmdb api

const router = express.Router();

/**
 * GET /api/favourites/tv
 * Return logged-in user's favourite TV shows
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const favourites = await FavouriteTv.find({ userId: req.user._id });
    res.status(200).json(favourites);
  })
);

/**
 * GET /api/favourites/tv/user/:uid
 * (optional) favourites for a specific user id
 */
router.get(
  "/user/:uid",
  asyncHandler(async (req, res) => {
    const favourites = await FavouriteTv.find({ userId: req.params.uid });
    res.status(200).json(favourites);
  })
);

/**
 * POST /api/favourites/tv/:tvId
 * Add/update a TV favourite for logged-in user
 */
router.post(
  "/:tvId",
  asyncHandler(async (req, res) => {
    const tvId = Number(req.params.tvId);

    const favourite = await FavouriteTv.findOneAndUpdate(
      { userId: req.user._id, tvId },   
      {
        userId: req.user._id,           
        tvId,
        // add fields here if your schema has them (name, posterPath, etc.)
      },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(201).json(favourite);
  })
);

/**
 * DELETE /api/favourites/tv/:tvId
 * Remove a TV favourite for logged-in user
 */
router.delete(
  "/:tvId",
  asyncHandler(async (req, res) => {
    const tvId = Number(req.params.tvId);

    const result = await FavouriteTv.deleteOne({
      userId: req.user._id, 
      tvId,
    });

    if (result.deletedCount) res.status(204).end();
    else res.status(404).json({ msg: "Favourite TV show not found" });
  })
);

export default router;
