
import { useEffect, useState } from "react";
import { getTrending } from "../Services/tmdb";
import "./Home.css"
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
            <h2>Trending Movies & TV Shows</h2>

            <div className="movie-grid">
                {items.map((item) => (
                    <article key={`${item.media_type}-${item.id}`}>
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
                            {item.media_type === "movie"
                                ? "ფილმი"
                                : item.media_type === "tv"
                                    ? "სერიალი"
                                    : "სხვა"}
                        </p>

                        <p>⭐ {item.vote_average?.toFixed(1)}</p>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Home;
