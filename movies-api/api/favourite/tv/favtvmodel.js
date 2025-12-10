// ./api/favourite/tv/favtvmodel.js
import mongoose, { Schema } from "mongoose";

const FavouriteTvSchema = new Schema({
  tvId: {
    type: Number,
    required: true,
  },
  title: String,
  posterPath: String,      
  releaseDate: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("FavouriteTv", FavouriteTvSchema);
