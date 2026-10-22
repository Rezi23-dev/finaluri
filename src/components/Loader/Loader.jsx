
import "./Loader.css";

const Loader = () => {
    return (
        <div className="loader-container">
            <div className="loader-spinner">
                <div className="loader-inner"></div>
            </div>

            <h2 className="loader-logo">
                Movies<span>Hub</span>
            </h2>

            <p className="loader-text">იტვირთება...</p>
        </div>
    );
};

export default Loader;
