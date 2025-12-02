import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import FavoriteIcon from "@mui/icons-material/Favorite";

const MustWatch = ({movie}) => {
    const context = useContext(MoviesContext);
    const { mustWatch } = context;
   const handleAddToPlaylist = (e) => {
        e.preventDefault();
        context.addToWatchlists(movie);
    };

    return (
        <PlaylistAddIcon  onClick={handleAddToPlaylist}/>    
    );

}

export default MustWatch;