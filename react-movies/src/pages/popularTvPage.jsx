import React from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import { getPopularTV } from "../api/tmdb-api";
import PageTemplate from "../components/templateTVShowListPage";
import AddToFavoritesIconShows from "../components/cardIcons/addToFavShows";
import AddToMustWatch from '../components/cardIcons/mustWatchShows'

const PopularTVPage = (props) => {
    const { data, error, isPending, isError } = useQuery({
        queryKey: ['popular'],
        queryFn: getPopularTV,
    });

    if (isPending) {
    return < Spinner/>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const shows = data.results;
  return (
     <PageTemplate
      title='Popular TV Shows'
      shows={shows}
      action={(show) =>{
        return (
          <>
            <AddToFavoritesIconShows show={show} />
            <AddToMustWatch show={show} />
          </>
        );
        
      }
    }
    />
  );
}
export default PopularTVPage;