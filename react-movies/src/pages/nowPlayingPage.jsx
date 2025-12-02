import React from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import { getNowPlayingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import AddToMustWatch from '../components/cardIcons/mustWatch'

const NowPlayingMoviesPage = (props) => {
    const { data, error, isPending, isError } = useQuery({
        queryKey: ['now_playing'],
        queryFn: getNowPlayingMovies,
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
            title="Now Playing Movies"
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
        )
}

export default NowPlayingMoviesPage;