import React, { useState, createContext } from "react";

export const ShowsContext = createContext();

const ShowsContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [mustWatch, setMustWatch] = useState([]);

  const addToFavorites = (show) => {
    if (!favorites.includes(show.id)) {
      setFavorites([...favorites, show.id]);
    }
  };

  const addToWatchlists = (show) => {
    if (!mustWatch.includes(show.id)) {
      setMustWatch([...mustWatch, show.id]);
    }
  };

  return (
    <ShowsContext.Provider
      value={{
        favorites,
        mustWatch,
        addToFavorites,
        addToWatchlists,
      }}
    >
      {props.children}
    </ShowsContext.Provider>
  );
};

export default ShowsContextProvider;
