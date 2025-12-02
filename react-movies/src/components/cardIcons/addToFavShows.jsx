import React, { useContext } from "react";
import {ShowsContext} from "../../contexts/showContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AddToFavoritesIconShows = ({ show }) => {
  const context = useContext(ShowsContext);

  const handleAddToFavorites = (e) => {
    e.preventDefault();
    context.addToFavorites(show);
  };
  

  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavoritesIconShows;
