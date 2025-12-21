import React from "react";
import { useQuery } from "@tanstack/react-query";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router";

import Spinner from "../components/spinner";
import { getMyReviews } from "../api/tmdb-api";
import { excerpt } from "../util";

export default function MyReviewsPage() {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["myReviews"],
    queryFn: getMyReviews,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const reviews = data || [];

  return (
    <div style={{ padding: 16 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        My Reviews
      </Typography>

      {reviews.length === 0 ? (
        <Typography>No reviews saved yet.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="my reviews table">
            <TableHead>
              <TableRow>
                <TableCell>Movie ID</TableCell>
                <TableCell>Author</TableCell>
                <TableCell align="center">Excerpt</TableCell>
                <TableCell align="right">More</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {reviews.map((r) => (
                <TableRow key={r._id}>
                  <TableCell>{r.movieId}</TableCell>
                  <TableCell>{r.author || "Me"}</TableCell>
                  <TableCell>{excerpt(r.review)}</TableCell>
                  <TableCell align="right">
                    <Link
                      to={`/reviews/${r._id}`}
                      state={{ review: r, movie: { id: r.movieId } }}
                    >
                      <Button variant="text">Full Review</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
