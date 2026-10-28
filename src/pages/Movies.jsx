
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../Services/tmdb";
import Loader from "../components/Loader/Loader";
import OptimizedImage from "../components/OptimizedImage";
import "./Movies.css";

const Movies = ({ filters = { search: "", genre: "" } }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchMovies = async () => {
      try {
        const data = await getMovies();

        if (!cancelled) {
          setMovies(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.message || "ფილმების ჩატვირთვა ვერ მოხერხდა"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchMovies();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <Loader />;
  if (error) return <p className="movies-message">{error}</p>;

  const searchText = (filters.search || "").trim().toLowerCase();
  const selectedGenre = Number(filters.genre);

  const filteredMovies = movies.filter((movie) => {
    const title = (movie.title || "").toLowerCase();

    const matchesSearch = title.includes(searchText);

    const matchesGenre =
      !filters.genre ||
      movie.genre_ids?.includes(selectedGenre);

    return matchesSearch && matchesGenre;
  });

  return (
    <section className="movies-page">
      <h2>Movies</h2>

      {filteredMovies.length === 0 ? (
        <p className="movies-message">ფილმები ვერ მოიძებნა.</p>
      ) : (
        <div className="movies-grid">
          {filteredMovies.map((movie) => (
            <Link
              key={movie.id}
              to={`/details/movie/${movie.id}`}
              className="movie-card-link"
            >
              <article className="movie-card">
                {movie.poster_path ? (
                  <OptimizedImage
                    path={"https://image.tmdb.org/t/p/w342/" + movie.poster_path}
                    alt={movie.title || "Movie poster"}
                    size="w342"
                    width={250}
                    height={375}
                    className="movie-poster"
                  />
                ) : (
                  <img
                    src="/no-poster.png"
                    alt="Poster unavailable"
                    width={250}
                    height={375}
                    className="movie-poster"
                    loading="lazy"
                    decoding="async"
                  />
                )}

                <h3>{movie.title}</h3>

                <p className="movie-rating">
                  ⭐ {movie.vote_average?.toFixed(1) ?? "N/A"}
                </p>
              </article>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default Movies;
