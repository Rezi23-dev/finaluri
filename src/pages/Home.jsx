
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTrending } from "../Services/tmdb";
import "./Home.css";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const Home = ({ filters = { search: "", genre: "" } }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        const fetchTrending = async () => {
            try {
                const data = await getTrending();

                if (!cancelled) {
                    setItems(data);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message || "მონაცემების ჩატვირთვა ვერ მოხერხდა");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchTrending();

        return () => {
            cancelled = true;
        };
    }, []);

    if (loading) return <p>იტვირთება...</p>;
    if (error) return <p>{error}</p>;

    const filteredItems = items.filter((item) => {
        const title = item.title || item.name || "";
        const searchText = (filters.search || "").trim().toLowerCase();

        const matchesSearch = title.toLowerCase().includes(searchText);

        const matchesGenre =
            !filters.genre ||
            item.genre_ids?.includes(Number(filters.genre));

        return matchesSearch && matchesGenre;
    });

    return (
        <section className="home">
            <h2>Trending Movies &amp; TV Shows</h2>

            {filteredItems.length === 0 ? (
                <p>შედეგები ვერ მოიძებნა.</p>
            ) : (
                <div className="movie-grid">
                    {filteredItems.map((item) => {
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
                                        loading="lazy"
                                    />

                                    <h3>{item.title || item.name}</h3>

                                    <p>
                                        {mediaType === "movie" ? "ფილმი" : "სერიალი"}
                                    </p>

                                    <p>
                                        ⭐ {item.vote_average?.toFixed(1) ?? "N/A"}
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
