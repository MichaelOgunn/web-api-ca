
import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import { getMovies } from "../api/tmdb-api";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import AddToMustWatch from '../components/cardIcons/mustWatch';

const MoviesPage = (props) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['discover'],
    queryFn: getMovies
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
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <AddToFavoritesIcon movie={movie} />
            <AddToMustWatch movie={movie} />
          </>
        );
      }}
    />
  );
};

export default MoviesPage;
