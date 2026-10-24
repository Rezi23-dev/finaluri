
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPopularMovies } from "../Services/tmdb";
import Loader from "../components/Loader/Loader";
import "./Popular.css";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const Popular = ({ filters = { search: "", genre: "" } }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        const fetchPopularMovies = async () => {
            try {
                const data = await getPopularMovies();

                if (!cancelled) {
                    setMovies(data);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err.message || "პოპულარული ფილმების ჩატვირთვა ვერ მოხერხდა"
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchPopularMovies();

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
            <h2>Popular Movies</h2>

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
                                    alt={movie.title || "Movie poster"}
                                    loading="lazy"
                                    decoding="async"
                                    width="250"
                                    height="375"
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

export default Popular;
