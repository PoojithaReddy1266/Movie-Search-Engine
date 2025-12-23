const API_KEY = "70d800c9"; 
const BASE_URL = "https://www.omdbapi.com/";
const FALLBACK_POSTER = "https://via.placeholder.com/200x300?text=No+Image";


const addFallbackPoster = (movies) => {
  return movies.map((movie) => ({
    ...movie,
    Poster: movie.Poster !== "N/A" ? movie.Poster : FALLBACK_POSTER,
  }));
};


const POPULAR_MOVIES_LIST = [
  "Avengers",
  "Inception",
  "Interstellar",
  "The Dark Knight",
  "Titanic",
  "Jurassic Park",
  "Spider-Man",
  "Harry Potter",
];

export const getPopularMovies = async () => {
  try {
    const movieResults = await Promise.all(
      POPULAR_MOVIES_LIST.map(async (title) => {
        const res = await fetch(
          `${BASE_URL}?apikey=${API_KEY}&t=${encodeURIComponent(title)}`
        );
        const data = await res.json();
        return data;
      })
    );

    // Filter valid movies and add fallback
    const movies = movieResults.filter((movie) => movie.Response !== "False");
    return addFallbackPoster(movies);
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};

export const searchMovies = async (query) => {
  if (!query) return [];
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    const movies = data.Search || [];
    return addFallbackPoster(movies);
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};