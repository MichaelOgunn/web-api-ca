import mongoose from "mongoose";

const { Schema } = mongoose;

const ReviewSchema = new Schema(
  {
    movieId: { type: Number, required: true },

    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    movieTitle: { type: String },
    username: { type: String }, 
    rating: { type: Number, min: 0, max: 10 },
    review: { type: String, required: true },
  },
  { timestamps: true }
);

ReviewSchema.index({ userId: 1, movieId: 1 }, { unique: true });

export default mongoose.model("Review", ReviewSchema);
