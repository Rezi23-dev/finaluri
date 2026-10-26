
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTrending, searchMovies } from "../Services/tmdb";
import "./Home.css";

const IMAGE_URL = "https://image.tmdb.org/t/p";

const Home = ({ filters = { search: "", genre: "" } }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        const fetchItems = async () => {
            setLoading(true);
            setError("");

            try {
                const query = filters.search?.trim();

                const data = query
                    ? await searchMovies(query)
                    : await getTrending();

                if (!cancelled) {
                    setItems(data);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err.message || "მონაცემების ჩატვირთვა ვერ მოხერხდა"
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchItems();

        return () => {
            cancelled = true;
        };
    }, [filters.search]);

    if (loading) return <p>იტვირთება...</p>;
    if (error) return <p>{error}</p>;

    return (
        <section className="home">
            <h2>
                {filters.search?.trim()
                    ? `ძიების შედეგები: ${filters.search}`
                    : "Trending Movies & TV Shows"}
            </h2>

            {items.length === 0 ? (
                <p>შედეგები ვერ მოიძებნა.</p>
            ) : (
                <div className="movie-grid">
                    {items.map((item) => {
                        const mediaType =
                            item.media_type === "tv" ? "tv" : "movie";

                        return (
                            <Link
                                key={`${mediaType}-${item.id}`}
                                to={`/details/${mediaType}/${item.id}`}
                                className="movie-card-link"
                            >
                                <article className="movie-card">
                                    <img
                                        src={
                                            item.poster_path
                                                ? `${IMAGE_URL}/w342${item.poster_path}`
                                                : "/no-poster.png"
                                        }
                                        srcSet={
                                            item.poster_path
                                                ? `
                ${IMAGE_URL}/w185${item.poster_path} 185w,
                ${IMAGE_URL}/w342${item.poster_path} 342w,
                ${IMAGE_URL}/w500${item.poster_path} 500w
            `
                                                : undefined
                                        }
                                        sizes="(max-width: 600px) 45vw, (max-width: 900px) 30vw, 250px"
                                        alt={item.title || item.name}
                                        loading="lazy"
                                        decoding="async"
                                        width="250"
                                        height="375"
                                    />

                                    <h3>{item.title || item.name}</h3>

                                    <p>
                                        {mediaType === "movie"
                                            ? "ფილმი"
                                            : "სერიალი"}
                                    </p>

                                    <p>
                                        ⭐{" "}
                                        {item.vote_average?.toFixed(1) ?? "N/A"}
                                    </p>
                                </article>
                            </Link>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

export default Home;
