import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg'
import { getGenres } from "../../api/tmdb-api";
import { getTVGenres } from "../../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';


const formControl =
{
  margin: 1,
  minWidth: "90%",
  backgroundColor: "rgb(255, 255, 255)"
};
export default function FilterCard( title = "Filter",
  type = "movie", // ✅ "movie" or "tv"
  titleFilter,
  genreFilter,
  onUserInput,
){
      // ✅ Choose API based on type
  const { data, error, isPending, isError } = useQuery({
    queryKey: [type === "movie" ? "movieGenres" : "tvGenres"],
    queryFn: type === "movie" ? getGenres : getTVGenres,
  });
  if (isPending) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const genres = data.genres;
   if (genres[0].name !== "All"){
    genres.unshift({ id: "0", name: "All" });
  }
}