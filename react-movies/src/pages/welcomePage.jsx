import React,{ useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { Link } from "react-router";

const WelcomePage = () => {
  const context = useContext(AuthContext);

  return context.isAuthenticated ? (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome back, {context.userName}!</h1>
      <p>Continue exploring your movies:</p>
      <div>
        <Link
          to="/movies"
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            textDecoration: "none",
            border: "1px solid",
            borderRadius: "5px",
          }}
        >
          Movies
        </Link>

        <Link
          to="/profile"
          style={{
            padding: "10px 20px",
            textDecoration: "none",
            border: "1px solid",
            borderRadius: "5px",
          }}
        >
          Profile
        </Link>
      </div>
    </div>
  ) : (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Movie App</h1>
      <p>Please log in or sign up to continue.</p>
      <div>
        <Link
          to="/login"
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            textDecoration: "none",
            border: "1px solid",
            borderRadius: "5px",
          }}
        >
          Login
        </Link>

        <Link
          to="/signup"
          style={{
            padding: "10px 20px",
            textDecoration: "none",
            border: "1px solid",
            borderRadius: "5px",
          }}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
