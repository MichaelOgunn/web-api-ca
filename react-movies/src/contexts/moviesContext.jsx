import React, { useState, useEffect } from "react";
import { getFavourites, addFavourite, removeFavourite,addWatchlist,getWatchlist,addOrUpdateReview,getMyReviews } from "../api/tmdb-api"; 

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
        const watchDocs = await getWatchlist();
      setMustWatch(watchDocs.map((w) => w.movieId));
      } catch (err) {
        console.error("Error loading favourites:", err);
      }
    };

    loadFavourites();
  }, []);

  const addToFavorites = async (movie) => {
    if (favorites.includes(movie.id)) return;

   
    setFavorites((prev) => [...prev, movie.id]);

    try {
      await addFavourite(movie.id);
    } catch (err) {
      console.error("Error adding favourite:", err);
      
      setFavorites((prev) => prev.filter((id) => id !== movie.id));
    }
  };

  const removeFromFavorites = async (movie) => {
  
    setFavorites((prev) => prev.filter((mId) => mId !== movie.id));

    try {
      await removeFavourite(movie.id);
    } catch (err) {
      console.error("Error removing favourite:", err);
    
      setFavorites((prev) =>
        prev.includes(movie.id) ? prev : [...prev, movie.id]
      );
    }
  };

 const addReview = async (movie, payload) => {
    const prev = myReviews[movie.id];

    setMyReviews((curr) => ({ ...curr, [movie.id]: payload })); 

    try {
      const saved = await addOrUpdateReview(movie.id, payload);
      setMyReviews((curr) => ({ ...curr, [movie.id]: saved }));
    } catch (err) {
      console.error("Error adding review:", err);
      
      setMyReviews((curr) => {
        const copy = { ...curr };
        if (prev) copy[movie.id] = prev;
        else delete copy[movie.id];
        return copy;
      });
    }
  };
  const addToWatchlists = async(movie) => {
    if (mustWatch.includes(movie.id)) return;
      setMustWatch((prev) => [...prev, movie.id] );
      try {
        await addWatchlist(movie.id);
      
      }catch (err) {
        console.error("Error adding to watchlist:", err);
        // rollback
        setMustWatch((prev) => prev.filter((id) => id!== movie.id));
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
