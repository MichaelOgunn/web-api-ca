import React, {useContext} from "react";
import { ShowsContext } from "../../contexts/showContext";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const MustWatchShows = ({ show }) => {
    const context = useContext(ShowsContext);
    const { mustWatch } = context;
    const handleAddToPlaylist = (e) => {
        e.preventDefault();
        context.addToWatchlists(show);
    };
    return (
        <div>
            <PlaylistAddIcon onClick={handleAddToPlaylist} />
        </div>
    );
}

export default MustWatchShows;