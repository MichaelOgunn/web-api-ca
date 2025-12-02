import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import MovieCredits from "../movieCredits";
import SimilarMovies from "../similarMovies";

export default function MovieExtraTabs({ movie }) {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ width: "100%", mt: 3 }}>
      <Tabs
        value={tab}
        onChange={handleChange}
        centered
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Cast & Crew" />
        <Tab label="Similar Movies" />
      </Tabs>

      {/* Tab panels */}
      <Box sx={{ mt: 2 }}>
        {tab === 0 && <MovieCredits movie={movie} />}
        {tab === 1 && <SimilarMovies movie={movie} />}
      </Box>
    </Box>
  );
}
