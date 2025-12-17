import mongoose from "mongoose";

const Schema = mongoose.Schema;

const mustWatchSchema = new Schema({
    movieId: {
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

export default mongoose.model("MustWatch", mustWatchSchema);