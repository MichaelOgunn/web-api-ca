import React, { useState, useContext } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Spinner from "../spinner";
import PageTemplate from "../templateMovieListPage";
import { MoviesContext } from "../../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../../api/tmdb-api";
import RemoveFromFavorites from "../cardIcons/removeFromFavorites";
import WriteReview from "../cardIcons/writeReview";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

export default function FavoriteTabs() {
  const {
    favorites: favoriteIds = [], // ✅ prevent undefined
    mustWatch: mustWatchIds = [],
    addToWatchlists,
  } = useContext(MoviesContext);

  const [tab, setTab] = useState(0);
  const handleChange = (event, newValue) => setTab(newValue);

  // ✅ fetch favorites in parallel
  const favoriteQueries = useQueries({
    queries: favoriteIds.map((id) => ({
      queryKey: ["movie", { id }],
      queryFn: getMovie,
    })),
  });

  // ✅ fetch must-watch in parallel
  const mustWatchQueries = useQueries({
    queries: mustWatchIds.map((id) => ({
      queryKey: ["movie", { id }],
      queryFn: getMovie,
    })),
  });

  // ✅ check if any query is still loading
  const isLoading =
    favoriteQueries.some((q) => q.isPending) ||
    mustWatchQueries.some((q) => q.isPending);

  if (isLoading) return <Spinner />;

  // ✅ extract movie data
  const favoriteMovies = favoriteQueries
    .map((q) => q.data)
    .filter(Boolean)
    .map((movie) => ({
      ...movie,
      genre_ids: movie.genres?.map((g) => g.id) || [],
    }));

  const mustWatchMovies = mustWatchQueries
    .map((q) => q.data)
    .filter(Boolean)
    .map((movie) => ({
      ...movie,
      genre_ids: movie.genres?.map((g) => g.id) || [],
    }));

  //  handle empty state 
  if (favoriteIds.length === 0 && mustWatchIds.length === 0) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <h3>You haven’t added any favorites or must-watch movies yet.</h3>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", mt: 3 }}>
      <Tabs
        value={tab}
        onChange={handleChange}
        centered
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label={`Favorite Movies (${favoriteMovies.length})`} />
        <Tab label={`Must Watch (${mustWatchMovies.length})`} />
      </Tabs>

      <Box sx={{ mt: 2 }}>
        
        {tab === 0 && (
            
          <PageTemplate
            title="Favorite Movies"
            movies={favoriteMovies}
            action={(movie) => (
              <>
                <RemoveFromFavorites movie={movie} />
                <WriteReview movie={movie} />
              </>
            )}
          />
        )}

        {tab === 1 && (
          <PageTemplate
            title="Must Watch Movies"
            movies={mustWatchMovies}
            action={(movie) => (
              <PlaylistAddIcon
                sx={{ cursor: "pointer" }}
                onClick={() => addToWatchlists(movie)}
              />
            )}
          />
        )}
      </Box>
    </Box>
  );
}
