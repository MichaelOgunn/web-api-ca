import React from "react";
import { Link } from "react-router";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png';

export default function TVShowCard({ show, action }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={
          <Typography variant="h5" component="p">
            {show.name}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={{ height: 500 }}
        image={
          show.poster_path
            ? `https://image.tmdb.org/t/p/w500/${show.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {show.first_air_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {show.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action && action(show)}
        {/* Note: The link below assumes you will create a details page for TV shows at this path. */}
        <Link to={`/tv/${show.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}