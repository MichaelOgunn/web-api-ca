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


 

    export const getMovieReviews = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
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
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}`
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
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${import.meta.env.VITE_TMDB_KEY}`
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
export const getFavourites = async () => {
  const response = await fetch('http://localhost:8080/api/favourites');
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.status_message || "Failed to fetch favourites");
  }
  return response.json();
};
// Add a movie to favourites
export const addFavourite = async (movieId) => {
  const response = await fetch(
    `http://localhost:8080/api/favourites/${movieId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.status_message || "Failed to add favourite");
  }

  return response.json();
};
export const removeFavourite = async (movieId) => {
  const response = await fetch(`http://localhost:8080/api/favourites/${movieId}`, {
    method: 'DELETE',
  });

  if (!response.ok && response.status !== 204) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.status_message || "Failed to remove favourite");
  }

  // no body on 204, so just return true
  return true;
};
export const getTvFavourites = async () => {
  const response = await fetch('http://localhost:8080/api/favourites/tv');
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.status_message || "Failed to fetch favourites");
  }
  return response.json();
};
// Add a TV show to favourites
export const addTvFavourite = async (tvId) => {
  const response = await fetch(
    `http://localhost:8080/api/favourites/tv/${tvId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.status_message || "Failed to add favourite");
  }

  return response.json();
};
