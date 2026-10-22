
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetails, getVideos } from "../Services/tmdb";
import "./Details.css";
import Loader from "../components/Loader/Loader";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_URL = "https://image.tmdb.org/t/p/original";

const Details = () => {
    const { mediaType, id } = useParams();

    const [movie, setMovie] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        const fetchDetails = async () => {
            setLoading(true);
            setError("");
            setMovie(null);
            setTrailer(null);

            try {
                const data = await getDetails(mediaType, id);

                if (!cancelled) {
                    setMovie(data);
                }

                try {
                    const video = await getVideos(mediaType, id);

                    if (!cancelled) {
                        setTrailer(video);
                    }
                } catch {

                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchDetails();

        return () => {
            cancelled = true;
        };
    }, [mediaType, id]);

    if (loading) return <Loader />;
    if (error) return <p className="details-message">{error}</p>;
    if (!movie) return <p className="details-message">ინფორმაცია ვერ მოიძებნა.</p>;

    const title = movie.title || movie.name;
    const releaseDate = movie.release_date || movie.first_air_date;

    return (
        <section className="details-page">
            {movie.backdrop_path && (
                <div
                    className="details-backdrop"
                    style={{
                        backgroundImage: `linear-gradient(to top, #080808 5%, rgba(8,8,8,.65)), url(${BACKDROP_URL}${movie.backdrop_path})`,
                    }}
                />
            )}

            <div className="details-content">
                <div className="details-info">
                    <img
                        className="details-poster"
                        src={
                            movie.poster_path
                                ? `${IMAGE_URL}${movie.poster_path}`
                                : "/no-poster.png"
                        }
                        alt={title}
                    />

                    <div className="details-text">
                        <h1>{title}</h1>

                        {releaseDate && <p>📅 {releaseDate}</p>}
                        {movie.vote_average > 0 && (
                            <p>⭐ {movie.vote_average.toFixed(1)} / 10</p>
                        )}

                        {movie.genres?.length > 0 && (
                            <p className="details-genres">
                                {movie.genres.map((genre) => genre.name).join(" • ")}
                            </p>
                        )}

                        <h2>აღწერა</h2>
                        <p className="details-overview">
                            {movie.overview || "აღწერა ხელმისაწვდომი არ არის."}
                        </p>
                    </div>
                </div>

                <div className="trailer-section">
                    <h2>თრეილერი</h2>

                    {trailer ? (
                        <div className="trailer-video">
                            <iframe
                                src={`https://www.youtube.com/embed/${trailer.key}`}
                                title={`${title} trailer`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        </div>
                    ) : (
                        <p>ამ დროისთვის თრეილერი ვერ მოიძებნა.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Details;
