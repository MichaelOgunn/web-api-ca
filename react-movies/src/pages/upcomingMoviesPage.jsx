import React from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import AddToMustWatch from '../components/cardIcons/mustWatch'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const UpcomingMoviesPage = (props) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['upcoming'], 
    queryFn: getUpcomingMovies
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const movies = data.results;

 
  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {

        return (
          <AddToMustWatch movie={movie} />

        )
      
      }}
    />
  );
};
export default UpcomingMoviesPage;