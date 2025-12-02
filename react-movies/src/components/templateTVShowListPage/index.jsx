import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import TVShowList from "../tvShowlist"; 
import Grid from "@mui/material/Grid";

function TemplateTVShowListPage({ shows, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);

  // Filter shows
  let displayedShows = shows
    .filter((s) => {
      return s.name.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((s) => {
      return genreId > 0 ? s.genre_ids.includes(genreId) : true;
    });

  // Handle filter changes
  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

  return (
    <Grid container>
      {/* Header */}
      <Grid size={12}>
        <Header title={title} />
      </Grid>

      {/* Filter + TV Show List */}
      <Grid container sx={{ flex: "1 1 500px" }}>
        <Grid
          key="find"
          size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
          sx={{ padding: "20px" }}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
          />
        </Grid>

        <TVShowList action={action} shows={displayedShows}></TVShowList>
      </Grid>
    </Grid>
  );
}

export default TemplateTVShowListPage;
