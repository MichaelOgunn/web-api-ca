import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FavoriteMovieSchema = new Schema({
  movieId: { 
    type: Number, 
    required: true 
  },

  title: { 
    type: String 
  },

  posterPath: { 
    type: String 
  },

  releaseDate: { 
    type: String 
  },

  created_at: { 
    type: Date, 
    default: Date.now 
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
});

// ✅ Prevent duplicate favourites per user
FavoriteMovieSchema.index({ userId: 1, movieId: 1 }, { unique: true });

export default mongoose.model('FavoriteMovie', FavoriteMovieSchema);
