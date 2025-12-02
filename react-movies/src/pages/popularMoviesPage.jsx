import React from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import { getPopularMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import AddToMustWatch from '../components/cardIcons/mustWatch'

const PopularMoviesPage = (props) => {
    const { data, error, isPending, isError } = useQuery({
        queryKey: ['popular'],
        queryFn: getPopularMovies,
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
      title='Popular Movies'
      movies={movies}
      action={(movie) =>{
        return <AddToFavoritesIcon movie={movie}/>
      }}
    />
  );

}

export default PopularMoviesPage;