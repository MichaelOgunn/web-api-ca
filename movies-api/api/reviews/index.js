import express from "express";
import asyncHandler from "express-async-handler";
import Review from "./reviewModel.js";

const router = express.Router();

/**
 * GET /api/reviews/movie/:movieId
 * Get all reviews for a movie (public)
 */
router.get(
  "/movie/:movieId",
  asyncHandler(async (req, res) => {
    const movieId = Number(req.params.movieId);
    const reviews = await Review.find({ movieId }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  })
);

/**
 * GET /api/reviews/user/:uid
 * Get all reviews by a user (public or protected – your choice)
 */
router.get(
  "/user/:uid",
  asyncHandler(async (req, res) => {
    const reviews = await Review.find({ userId: req.params.uid }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  })
);

/**
 * GET /api/reviews
 * Get logged-in user's reviews (protected)
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const reviews = await Review.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  })
);

/**
 * POST /api/reviews/:movieId
 * Create or update the logged-in user's review for a movie (protected)
 */
router.post(
  "/:movieId",
  asyncHandler(async (req, res) => {
    const movieId = Number(req.params.movieId);
    const { rating, review } = req.body;

    const saved = await Review.findOneAndUpdate(
      { userId: req.user._id, movieId },
      {
        userId: req.user._id,
        movieId,
        username: req.user.userName || req.user.username, // adjust to your user model field
        rating,
        review,
      },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(201).json(saved);
  })
);

/**
 * PUT /api/reviews/:id
 * Update review by id (owner only) (protected)
 */
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    if (req.body._id) delete req.body._id;

    const result = await Review.updateOne(
      { _id: req.params.id, userId: req.user._id },
      req.body
    );

    if (result.matchedCount) res.status(200).json({ msg: "Review updated" });
    else res.status(404).json({ msg: "Review not found" });
  })
);

/**
 * DELETE /api/reviews/:id
 * Delete review by id (owner only) (protected)
 */
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const result = await Review.deleteOne({ _id: req.params.id, userId: req.user._id });

    if (result.deletedCount) res.status(204).end();
    else res.status(404).json({ msg: "Review not found" });
  })
);

export default router;
