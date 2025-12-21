import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import FavoriteShowPage from "./pages/favouriteShowPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import ShowsContextProvider from "./contexts/showContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import UpcomingMoviesPage from './pages/upcomingMoviesPage'
import PopularMoviesPage from "./pages/popularMoviesPage";
import NowPlayingMoviesPage from "./pages/nowPlayingPage";
import PopularTVPage from "./pages/popularTvPage";
import MovieDetailsExtensionPage from "./pages/moreInfoPage";
import SignUpPage from "./pages/signUpPage";
import LoginPage from "./pages/loginPage";
import AuthContextProvider from "./contexts/authContext";
import WelcomePage from "./pages/welcomePage";
import MoviesPage from "./pages/moviesPage";
import ProfilePage from "./pages/profilePage";
import MyReviewsPage from "./pages/myReviewsPage";
import PrivateRoute from "./components/privateRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <ShowsContextProvider>
          <Routes>
            <Route path="/movies/favorites" element={<PrivateRoute><FavoriteMoviesPage /></PrivateRoute>} />
            <Route path="/movies/favoritesShow" element={<PrivateRoute><FavoriteShowPage /></PrivateRoute>} />

            <Route path="/reviews/:id" element={<MovieReviewPage />} />
            <Route path="/movies/:id/:pageType/:reviewId?" element={<MovieDetailsExtensionPage />} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/reviews/form" element={<AddMovieReviewPage />} />
            <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
            <Route path="/movies/popular" element={<PopularMoviesPage />} />
            <Route path="/movies/nowPlaying" element={<NowPlayingMoviesPage />} />
            <Route path="/movies/popularTv" element={<PopularTVPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="/reviews/mine" element={<MyReviewsPage />} />



            <Route path="/" element={<WelcomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          </ShowsContextProvider>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
      </AuthContextProvider>
    </QueryClientProvider>
  );
};



const rootElement = createRoot(document.getElementById("root"))
rootElement.render(<App />);
