
import { useEffect, useState } from "react";
import { getUpcoming } from "../../Services/tmdb";
import "./Banner.css";

const IMAGE_URL = "https://image.tmdb.org/t/p";

const Banner = () => {
    const [movies, setMovies] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const fetchMovies = async () => {
            try {
                const data = await getUpcoming();

                if (!cancelled) {
                    setMovies(data);
                }
            } catch (error) {
                if (!cancelled) {
                    console.error("Failed to load upcoming movies:", error);
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

    useEffect(() => {
        if (movies.length <= 1) return;

        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % movies.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [movies.length]);

    if (loading) {
        return (
            <section
                className="banner banner-loading"
                aria-label="Upcoming movies"
            />
        );
    }

    if (!movies.length) return null;

    const movie = movies[activeIndex];

    const imageUrl = movie.backdrop_path
        ? `${IMAGE_URL}/w1280${movie.backdrop_path}`
        : null;

    return (
        <section className="banner">
            {imageUrl && (
                <img
                    className="banner-img"
                    src={imageUrl}
                    srcSet={`
                        ${IMAGE_URL}/w780${movie.backdrop_path} 780w,
                        ${IMAGE_URL}/w1280${movie.backdrop_path} 1280w
                    `}
                    sizes="(max-width: 768px) 100vw, 853px"
                    alt={movie.title || movie.name || "Upcoming movie"}
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                />
            )}

            <div className="banner-overlay">
                <div className="banner-content">
                    <p className="banner-label">COMING SOON</p>

                    <h1>{movie.title || movie.name}</h1>

                    <p className="banner-date">
                        Release date: {movie.release_date || "Coming soon"}
                    </p>

                    <p className="banner-description">
                        {movie.overview ||
                            "Discover the next big movie coming to theaters."}
                    </p>

                    <div className="banner-dots">
                        {movies.map((item, index) => (
                            <button
                                key={item.id}
                                type="button"
                                className={
                                    index === activeIndex
                                        ? "banner-dot active"
                                        : "banner-dot"
                                }
                                onClick={() => setActiveIndex(index)}
                                aria-label={`Show ${item.title || item.name}`}
                                aria-current={
                                    index === activeIndex ? "true" : undefined
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
