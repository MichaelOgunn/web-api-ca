import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import PageTemplate from "../components/templateMoviePage";
import { getMovie } from "../api/tmdb-api";
import MovieExtraTabs from "../components/movieExtraTabs";

const MovieDetailsExtensionPage = () => {
  const { id } = useParams();

  const {
    data: movie,
    error: movieError,
    isLoading: movieLoading,
  } = useQuery({
    queryKey: ["movie", { id }],
    queryFn: getMovie,
  });

  if (movieLoading) return <p>Loading...</p>;
  if (movieError) return <p>Error loading movie.</p>;
  if (!movie) return <p>Movie not found.</p>;

  return (
    <PageTemplate movie={movie}>
      <MovieExtraTabs movie={movie} />
    </PageTemplate>
  );
};

export default MovieDetailsExtensionPage;
