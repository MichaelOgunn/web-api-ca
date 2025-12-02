import React, { useState, useContext } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Spinner from "../spinner";
import PageTemplate from "../templateTVShowListPage"; // ✅ use your TV show template
import { ShowsContext } from "../../contexts/showContext"; // ✅ use show context
import { useQueries } from "@tanstack/react-query";
import { getTvShow } from "../../api/tmdb-api"; // ✅ fetch single TV show
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function FavoriteShowTabs() {
  const {
    favorites: favoriteIds = [],
    mustWatch: mustWatchIds = [],
    addToWatchlists,
  } = useContext(ShowsContext); // ✅ changed from MoviesContext

  const [tab, setTab] = useState(0);
  const handleChange = (event, newValue) => setTab(newValue);

  // ✅ fetch favorite shows
  const favoriteQueries = useQueries({
    queries: favoriteIds.map((id) => ({
      queryKey: ["tvshow", { id }],
      queryFn: getTvShow,
    })),
  });

  // ✅ fetch must-watch shows
  const mustWatchQueries = useQueries({
    queries: mustWatchIds.map((id) => ({
      queryKey: ["tvshow", { id }],
      queryFn: getTvShow,
    })),
  });

  const isLoading =
    favoriteQueries.some((q) => q.isPending) ||
    mustWatchQueries.some((q) => q.isPending);

  if (isLoading) return <Spinner />;

  // ✅ map results
  const favoriteShows = favoriteQueries
    .map((q) => q.data)
    .filter(Boolean);

  const mustWatchShows = mustWatchQueries
    .map((q) => q.data)
    .filter(Boolean);

  // ✅ handle empty state
  if (favoriteIds.length === 0 && mustWatchIds.length === 0) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <h3>You haven’t added any favorites or must-watch shows yet.</h3>
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
        <Tab label={`Favorite Shows (${favoriteShows.length})`} />
        <Tab label={`Must Watch (${mustWatchShows.length})`} />
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {tab === 0 && (
          <PageTemplate
            title="Favorite TV Shows"
            shows={favoriteShows}
            action={(show) => (
              <FavoriteIcon color="primary" fontSize="large" />
              
            )}
          />
        )}

        {tab === 1 && (
          <PageTemplate
            title="Must Watch Shows"
            shows={mustWatchShows}
            action={(show) => (
              <PlaylistAddIcon
                sx={{ cursor: "pointer" }}
                onClick={() => addToWatchlists(show)}
              />
            )}
          />
        )}
      </Box>
    </Box>
  );
}
