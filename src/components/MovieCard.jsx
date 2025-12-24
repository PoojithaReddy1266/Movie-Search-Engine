import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {
  const { favorites, addFavorite, removeFavorite } = useMovieContext();
  const favorite = favorites.some((m) => m.imdbID === movie.imdbID);

  const onFavoriteClick = (e) => {
    e.preventDefault();
    if (favorite) removeFavorite(movie.imdbID);
    else addFavorite(movie);
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={movie.Poster} alt={movie.Title} />
        <div className="movie-overlay"></div>
        <button
          className={`favorite-btn ${favorite ? "active" : ""}`}
          onClick={onFavoriteClick}
        >
          ♥
        </button>
      </div>

      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
    </div>
  );
}

export default MovieCard;
