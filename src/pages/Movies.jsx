
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../Services/tmdb";
import Loader from "../components/Loader/Loader";
import "./Movies.css";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

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
          setError(err.message || "ფილმების ჩატვირთვა ვერ მოხერხდა");
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

  const filteredMovies = movies.filter((movie) => {
    const title = movie.title || "";
    const searchText = (filters.search || "").trim().toLowerCase();

    const matchesSearch = title.toLowerCase().includes(searchText);

    const matchesGenre =
      !filters.genre ||
      movie.genre_ids?.includes(Number(filters.genre));

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
                <img
                  src={
                    movie.poster_path
                      ? `${IMAGE_URL}${movie.poster_path}`
                      : "/no-poster.png"
                  }
                  alt={movie.title}
                  loading="lazy"
                />

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
