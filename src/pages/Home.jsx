import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
  e.preventDefault();
  
  const query = searchQuery.trim();

  if (query.length < 3) {
    setError("Please enter at least 3 characters");
    setMovies([]); 
    setLoading(false); 
    return;
  }

  setError(null);
  setLoading(true);

  try {
    const searchResults = await searchMovies(query);
    if (searchResults.length === 0) {
      setError("No movies found");
      setMovies([]);
    } else {
      setMovies(searchResults);
      setError(null);
    }
  } catch (err) {
    console.log(err);
    setError("Failed to search movies...");
    setMovies([]);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {searchQuery.trim().length > 0 && searchQuery.trim().length < 3 && (
        <div className="error-message">Please enter at least 3 characters</div>
      )}

      {error && searchQuery.trim().length >= 3 && (
        <div className="error-message">{error}</div>
      )}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;