import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTrending } from "../Services/tmdb";
import "./Home.css";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const Home = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const data = await getTrending();
                setItems(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTrending();
    }, []);

    if (loading) return <p>იტვირთება...</p>;
    if (error) return <p>{error}</p>;

    return (
        <section className="home">
            <h2>Trending Movies &amp; TV Shows</h2>

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
                                            ? `${IMAGE_URL}${item.poster_path}`
                                            : "/no-poster.png"
                                    }
                                    alt={item.title || item.name}
                                />

                                <h3>{item.title || item.name}</h3>

                                <p>
                                    {mediaType === "movie"
                                        ? "ფილმი"
                                        : "სერიალი"}
                                </p>

                                <p>
                                    ⭐ {item.vote_average?.toFixed(1) ?? "N/A"}
                                </p>
                            </article>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default Home;