import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getSimilarMovies } from "../../api/tmdb-api";
import Spinner from "../spinner";

export default function SimilarMovies({ movie }) {
  // 🧩 wait until movie.id exists before starting the query
  const isMovieReady = !!movie?.id;

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["similarMovies", { id: movie?.id }],
    queryFn: getSimilarMovies,
    enabled: isMovieReady, // prevents query until movie.id is ready
  });

  // ⏳ while waiting for movie to load
  if (!isMovieReady) return <Spinner />;

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const similarMovies = data?.results || [];

  if (similarMovies.length === 0) {
    return <p>No similar movies found.</p>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550 }} aria-label="similar movies table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="center">Release Date</TableCell>
            <TableCell align="right">More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {similarMovies.map((m) => (
            <TableRow key={m.id}>
              <TableCell component="th" scope="row">
                {m.title}
              </TableCell>
              <TableCell align="center">{m.release_date}</TableCell>
              <TableCell align="right">
                <Link
                  to={`/movies/${m.id}`}
                  state={{
                    movie: m,
                  }}
                >
                  View Details
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
