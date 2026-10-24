import { useEffect, useState } from "react";
import { getUpcoming } from "../../Services/tmdb";
import "./Banner.css";

const IMAGE_URL = "https://image.tmdb.org/t/p/w1280";

const Banner = () => {
    const [movies, setMovies] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await getUpcoming();
                setMovies(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    useEffect(() => {
        if (movies.length <= 1) return;

        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % movies.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [movies]);

    if (loading) {
        return <section className="banner banner-loading" />;
    }

    if (!movies.length) {
        return null;
    }

    const movie = movies[activeIndex];

    return (
        <section className="banner">
            <img
                key={movie.id}
                src={`${IMAGE_URL}${movie.backdrop_path}`}
                alt={movie.title}
                className="banner-img"
                fetchPriority={activeIndex === 0 ? "high" : "auto"}
                loading={activeIndex === 0 ? "eager" : "lazy"}
                decoding="async"
            />

            <div className="banner-overlay">
                <div className="banner-content">
                    <p className="banner-label">COMING SOON</p>

                    <h1>{movie.title}</h1>

                    <p className="banner-date">
                        Release date: {movie.release_date}
                    </p>

                    <p className="banner-description">
                        {movie.overview ||
                            "Discover the next big movie coming to theaters."}
                    </p>

                    <div className="banner-dots">
                        {movies.map((item, index) => (
                            <button
                                key={item.id}
                                className={
                                    index === activeIndex
                                        ? "banner-dot active"
                                        : "banner-dot"
                                }
                                onClick={() => setActiveIndex(index)}
                                aria-label={`Show ${item.title}`}
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