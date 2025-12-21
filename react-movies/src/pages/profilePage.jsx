import React, { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import {
  Typography,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";

import Spinner from "../components/spinner";
import { getMyReviews } from "../api/tmdb-api";
import { excerpt } from "../util";

const ProfilePage = () => {
  const { userName } = useContext(AuthContext);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["myReviews"],
    queryFn: getMyReviews,
  });

  if (isPending) return <Spinner />;
  if (isError) return <Typography>{error.message}</Typography>;

  const reviews = data || [];

  return (
    <Box sx={{ padding: 4 }}>
      <Paper sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>

        <Typography variant="h6">
          Welcome, {userName}!
        </Typography>

        <Typography variant="body1" sx={{ marginTop: 2 }}>
          This is your profile page. You can view your details and manage your account here.
        </Typography>

        {/* MY REVIEWS */}
        <Typography variant="h5" sx={{ marginTop: 4, marginBottom: 2 }}>
          My Reviews
        </Typography>

        {reviews.length === 0 ? (
          <Typography>You haven’t written any reviews yet.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Movie ID</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Excerpt</TableCell>
                  <TableCell align="right">More</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {reviews.map((r) => (
                  <TableRow key={r._id}>
                    <Link to={`/movies/${r.movieId}`}>
                      {r.movieId || "View Movie"}
                    </Link>
                    <TableCell>{r.rating}</TableCell>
                    <TableCell>{excerpt(r.review)}</TableCell>
                    <TableCell align="right">
                      <Link
                        to={`/reviews/${r._id}`}
                        state={{ review: r, movie: { id: r.movieId } }}
                      >
                        <Button size="small">Full Review</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
};

export default ProfilePage;
