import React, { useState, useEffect } from "react";
import { getFavourites, addFavourite, removeFavourite } from "../api/tmdb-api"; 

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} ) 
  const [mustWatch, setMustWatch] = useState( [] )  

  
  useEffect(() => {
    const loadFavourites = async () => {
      try {
        const favDocs = await getFavourites(); // [{ movieId, ... }]
        setFavorites(favDocs.map((f) => f.movieId));
      } catch (err) {
        console.error("Error loading favourites:", err);
      }
    };

    loadFavourites();
  }, []);

  const addToFavorites = async (movie) => {
    if (favorites.includes(movie.id)) return;

    // optimistic update
    setFavorites((prev) => [...prev, movie.id]);

    try {
      await addFavourite(movie.id);
    } catch (err) {
      console.error("Error adding favourite:", err);
      // rollback
      setFavorites((prev) => prev.filter((id) => id !== movie.id));
    }
  };

  const removeFromFavorites = async (movie) => {
    // optimistic update
    setFavorites((prev) => prev.filter((mId) => mId !== movie.id));

    try {
      await removeFavourite(movie.id);
    } catch (err) {
      console.error("Error removing favourite:", err);
      // rollback: re-add if missing
      setFavorites((prev) =>
        prev.includes(movie.id) ? prev : [...prev, movie.id]
      );
    }
  };

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
  };

  const addToWatchlists = (movie) => {
    if (!mustWatch.includes(movie.id)) {
      setMustWatch([...mustWatch, movie.id]);
    }
  };

  const removeFromWatchlists = (movie) => {
    setMustWatch(mustWatch.filter((mId) => mId !== movie.id));
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        mustWatch,
        addToFavorites,
        removeFromFavorites,
        addReview,
        addToWatchlists,
        removeFromWatchlists,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
