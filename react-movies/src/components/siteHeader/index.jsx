import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AuthContext } from "../../contexts/authContext";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [anchorElMain, setAnchorElMain] = useState(null);
  const [anchorElMovies, setAnchorElMovies] = useState(null);
  const [anchorElTV, setAnchorElTV] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, signout } = useContext(AuthContext);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleMenuSelect = (path) => {
    navigate(path);
    handleCloseAll();
  };

  const handleLogout = () => {
    signout();
    handleCloseAll();
    navigate('/login');
  };

  const handleCloseAll = () => {
    setAnchorElMain(null);
    setAnchorElMovies(null);
    setAnchorElTV(null);
  };

  const handleOpenMovies = (event) => setAnchorElMovies(event.currentTarget);
  const handleOpenTV = (event) => setAnchorElTV(event.currentTarget);

  const handleMainMenu = (event) => setAnchorElMain(event.currentTarget);

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            All you ever wanted to know about Movies!
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMainMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElMain}
                open={Boolean(anchorElMain)}
                onClose={handleCloseAll}
              >
                {isAuthenticated ? (
                  [
                    <MenuItem key="movies" onClick={handleOpenMovies}>Movies ▸</MenuItem>,
                    <Menu
                      key="movies-submenu"
                      anchorEl={anchorElMovies}
                      open={Boolean(anchorElMovies)}
                      onClose={handleCloseAll}
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                      <MenuItem onClick={() => handleMenuSelect("/movies")}>All Movies</MenuItem>
                      <MenuItem onClick={() => handleMenuSelect("/movies/favorites")}>Favorites</MenuItem>
                      <MenuItem onClick={() => handleMenuSelect("/movies/upcoming")}>Upcoming</MenuItem>
                      <MenuItem onClick={() => handleMenuSelect("/movies/popular")}>Popular</MenuItem>
                      <MenuItem onClick={() => handleMenuSelect("/movies/nowPlaying")}>Now Playing</MenuItem>
                    </Menu>,
                    <MenuItem key="tv" onClick={handleOpenTV}>TV Shows ▸</MenuItem>,
                    <Menu
                      key="tv-submenu"
                      anchorEl={anchorElTV}
                      open={Boolean(anchorElTV)}
                      onClose={handleCloseAll}
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                      <MenuItem onClick={() => handleMenuSelect("/movies/popularTV")}>Popular TV</MenuItem>
                      <MenuItem onClick={() => handleMenuSelect("/movies/favoritesShow")}>Favourite TV</MenuItem>
                    </Menu>,
                    <MenuItem key="profile" onClick={() => handleMenuSelect("/profile")}>Profile</MenuItem>,
                    <MenuItem key="logout" onClick={handleLogout}>Logout</MenuItem>
                  ]
                ) : (
                  [
                    <MenuItem key="login" onClick={() => handleMenuSelect("/login")}>Login</MenuItem>,
                    <MenuItem key="signup" onClick={() => handleMenuSelect("/signup")}>Sign Up</MenuItem>
                  ]
                )}
              </Menu>
            </>
          ) : (
            <>
              {isAuthenticated ? (
                <>
                  <Button
                    color="inherit"
                    onClick={handleOpenMovies}
                    sx={{ fontWeight: "bold" }}
                  >
                    Movies
                  </Button>
                  <Menu
                    anchorEl={anchorElMovies}
                    open={Boolean(anchorElMovies)}
                    onClose={handleCloseAll}
                  >
                    <MenuItem onClick={() => handleMenuSelect("/movies")}>All Movies</MenuItem>
                    <MenuItem onClick={() => handleMenuSelect("/movies/favorites")}>Favorites</MenuItem>
                    <MenuItem onClick={() => handleMenuSelect("/movies/upcoming")}>Upcoming</MenuItem>
                    <MenuItem onClick={() => handleMenuSelect("/movies/popular")}>Popular</MenuItem>
                    <MenuItem onClick={() => handleMenuSelect("/movies/nowPlaying")}>Now Playing</MenuItem>
                  </Menu>

                  <Button
                    color="inherit"
                    onClick={handleOpenTV}
                    sx={{ fontWeight: "bold" }}
                  >
                    TV Shows
                  </Button>
                  <Menu
                    anchorEl={anchorElTV}
                    open={Boolean(anchorElTV)}
                    onClose={handleCloseAll}
                  >
                    <MenuItem onClick={() => handleMenuSelect("/movies/popularTV")}>Popular TV</MenuItem>
                    <MenuItem onClick={() => handleMenuSelect("/movies/favoritesShow")}>Favourite TV</MenuItem>
                  </Menu>
                  <Button color="inherit" onClick={() => navigate("/profile")}>
                    Profile
                  </Button>
                  <Button color="inherit" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button color="inherit" onClick={() => navigate("/login")}>
                    Login
                  </Button>
                  <Button color="inherit" onClick={() => navigate("/signup")}>
                    Sign Up
                  </Button>
                </>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
