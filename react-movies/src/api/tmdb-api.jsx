
export const getMovies = () => {
  return fetch(
    `http://localhost:8080/api/movies/discover`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};



export const getMovie = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
  `http://localhost:8080/api/movies/${id}`).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
}
  export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `http://localhost:8080/api/movies/${id}/images`
    ).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })    
  };

export const getTvShow = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/tv/${id}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
 .catch((error) => {
    throw error
 });
};



  export const getGenres = () => {
    return fetch(
      `http://localhost:8080/api/movies/genres`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };


 

export const getMovieReviews = async ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movies/${id}/reviews`).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
};
export const getUpcomingMovies = () => {
    return fetch(
      `http://localhost:8080/api/movies/upcoming`
    ).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
        throw error
    });
  };
export const getPopularMovies = () => {
  return fetch(
    `http://localhost:8080/api/movies/popular`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};

export const getNowPlayingMovies = () => {
  return fetch(
    `http://localhost:8080/api/movies/now_playing`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};

export const getPopularTV = () => {
  return fetch(
    `http://localhost:8080/api/tv/popular`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};
export const getMovieCredits = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;

  return fetch(
    //local host
    `http://localhost:8080/api/movies/${id}/credits`
    )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};


export const getSimilarMovies = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;

  return fetch(
    //local host  
    `http://localhost:8080/api/movies/${id}/similar`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const login = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};

export const signup = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};
export const addFavourite = async (movieId) => {
  const response = await fetch(`http://localhost:8080/api/favourites/${movieId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: window.localStorage.getItem("token"),
    },
  });

  if (!response.ok) throw new Error(await response.text());
  return response.json();
};

export const getFavourites = async () => {
  const response = await fetch("http://localhost:8080/api/favourites", {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });

  if (!response.ok) throw new Error(await response.text());
  return response.json();
};

export const removeFavourite = async (movieId) => {
  const response = await fetch(`http://localhost:8080/api/favourites/${movieId}`, {
    method: "DELETE",
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });

  if (!response.ok && response.status !== 204) throw new Error(await response.text());
  return true;
};


export const getTvFavourites = async () => {
  const response = await fetch("http://localhost:8080/api/favourites/tv", {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });

  if (!response.ok) throw new Error(await response.text());
  return response.json();
};

// Add a TV show to favourites
export const addTvFavourite = async (tvId) => {
  const response = await fetch(`http://localhost:8080/api/favourites/tv/${tvId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: window.localStorage.getItem("token"),
    },
  });

  if (!response.ok) throw new Error(await response.text());
  return response.json();
};

// Remove a TV show from favourites
export const removeTvFavourite = async (tvId) => {
  const response = await fetch(`http://localhost:8080/api/favourites/tv/${tvId}`, {
    method: "DELETE",
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });

  if (!response.ok && response.status !== 204) throw new Error(await response.text());
  return true;
};
// Add a movie to watchlist
export const addWatchlist = async (movieId) => {
  const response = await fetch(`http://localhost:8080/api/mustwatch/${movieId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: window.localStorage.getItem("token"),
    },
  });

  if (!response.ok) throw new Error(await response.text());
  return response.json();
};

// Remove a movie from watchlist
export const removeWatchlist = async (movieId) => {
  const response = await fetch(`http://localhost:8080/api/mustwatch/${movieId}`, {
    method: "DELETE",
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });

  if (!response.ok && response.status!== 204) throw new Error(await response.text());
  return true;
};

// Get watchlist
export const getWatchlist = async () => {
  const response = await fetch("http://localhost:8080/api/mustwatch", {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });

  if (!response.ok) throw new Error(await response.text());
  return response.json();
};

// Get mustwatch tv
export const getMustwatchTV = async () => {
  const response = await fetch("http://localhost:8080/api/mustwatch/tv", {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });

  if (!response.ok) throw new Error(await response.text());
  return response.json();
};

// Add a TV show to mustwatch
export const addMustwatchTV = async (tvId) => {
  const response = await fetch(`http://localhost:8080/api/mustwatch/tv/${tvId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: window.localStorage.getItem("token"),
    },
  });

  if (!response.ok) throw new Error(await response.text());
  return response.json();
};
export const getMyReviews = async () => {
  const res = await fetch(`http://localhost:8080/api/reviews`, {
    headers: { Authorization: localStorage.getItem("token") },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const addOrUpdateReview = async (movieId, data) => {
  const res = await fetch(`http://localhost:8080/api/reviews/${movieId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};
