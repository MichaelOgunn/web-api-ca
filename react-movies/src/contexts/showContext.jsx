import React, { useState, useEffect, createContext } from "react";
import {
  getTvFavourites,
  addTvFavourite,
  // removeTvFavourite,
} from "../api/tmdb-api"; 

export const ShowsContext = createContext();

const ShowsContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);   // array of tv show IDs
  const [mustWatch, setMustWatch] = useState([]);   // still local only for now

  useEffect(() => {
    const loadTvFavourites = async () => {
      try {
        const favDocs = await getTvFavourites(); // [{ tvId, name, ... }]
        setFavorites(favDocs.map((f) => f.tvId));
      } catch (err) {
        console.error("Error loading TV favourites:", err);
      }
    };

    loadTvFavourites();
  }, []);

  const addToFavorites = async (show) => {
    if (favorites.includes(show.id)) return;

    // optimistic update
    setFavorites((prev) => [...prev, show.id]);

    try {
      await addTvFavourite(show.id);
    } catch (err) {
      console.error("Error adding TV favourite:", err);
      // rollback
      setFavorites((prev) => prev.filter((id) => id !== show.id));
    }
  };

  // const removeFromFavorites = async (show) => {
  //   // optimistic update
  //   setFavorites((prev) => prev.filter((id) => id !== show.id));

  //   try {
  //     await removeTvFavourite(show.id);
  //   } catch (err) {
  //     console.error("Error removing TV favourite:", err);
  //     // rollback – re-add if missing
  //     setFavorites((prev) =>
  //       prev.includes(show.id) ? prev : [...prev, show.id]
  //     );
  //   }
  // };

  // Must-watch list stays purely client-side (like before)
  const addToWatchlists = (show) => {
    if (!mustWatch.includes(show.id)) {
      setMustWatch((prev) => [...prev, show.id]);
    }
  };

  return (
    <ShowsContext.Provider
      value={{
        favorites,
        mustWatch,
        addToFavorites,       // now async + backend
        // removeFromFavorites,  // new
        addToWatchlists,
      }}
    >
      {props.children}
    </ShowsContext.Provider>
  );
};

export default ShowsContextProvider;
