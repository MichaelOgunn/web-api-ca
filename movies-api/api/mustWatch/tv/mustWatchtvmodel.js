import mongoose from "mongoose";

const Schema = mongoose.Schema;

const mustWatchtvSchema = new Schema({
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

export default mongoose.model("MustWatchTv", mustWatchtvSchema);