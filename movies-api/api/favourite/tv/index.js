// api/favourite/tv/index.js
import express from "express";
import asyncHandler from "express-async-handler";
import FavouriteTv from "./favtvmodel.js";

const router = express.Router();

/**
 * GET /api/favourites/tv
 * Return all favourite TV shows
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const favourites = await FavouriteTv.find();
    res.status(200).json(favourites);
  })
);

/**
 * OPTIONAL: per-user TV favourites if you ever use userId
 * GET /api/favourites/tv/user/:uid
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
 * Add/update a TV favourite (no auth, global)
 */
router.post(
  "/:tvId",
  asyncHandler(async (req, res) => {
    const tvId = Number(req.params.tvId);

    const favourite = await FavouriteTv.findOneAndUpdate(
      { tvId },
      { tvId },
      { upsert: true, new: true }
    );

    res.status(201).json(favourite);
  })
);

/**
 * OPTIONAL: DELETE /api/favourites/tv/:tvId
 */
router.delete(
  "/:tvId",
  asyncHandler(async (req, res) => {
    const tvId = Number(req.params.tvId);

    const result = await FavouriteTv.deleteOne({ tvId });

    if (result.deletedCount) {
      res.status(204).end();
    } else {
      res.status(404).json({ msg: "Favourite TV show not found" });
    }
  })
);

export default router;
