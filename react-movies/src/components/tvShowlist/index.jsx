import React from "react";
import TVShowCard from "../tvShowCard";
import Grid from "@mui/material/Grid";

const TVShowList = (props) => {
  let showCards = props.shows.map((s) => (
    <Grid
      key={s.id}
      size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
      sx={{ padding: "20px" }}
    >
      <TVShowCard key={s.id} show={s} action={props.action} />
    </Grid>
  ));
  return showCards;
};

export default TVShowList;
