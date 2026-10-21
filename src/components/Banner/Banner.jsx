
import "./Banner.css";

const Banner = () => {
    return (
        <section className="banner">
            <img
                src="https://image.tmdb.org/t/p/original/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg"
                alt="Featured movie"
                className="banner-img"
            />

            <div className="banner-overlay">
                <div className="banner-content">
                    <h1>Welcome</h1>
                    <h2>Millions of movies, TV shows and people to discover. Explore now.</h2>


                </div>
            </div>
        </section>
    );
};

export default Banner;
