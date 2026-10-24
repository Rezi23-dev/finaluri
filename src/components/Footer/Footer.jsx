import React from 'react';
import './Footer.css';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-brand">
                    <Link to="/" className="footer-logo">
                        Movies<span>Hub</span>
                    </Link>

                    <p className="footer-description">
                        Discover movies, explore popular titles,
                        and find your next favorite film.
                    </p>
                </div>

            </div>

            <div className="footer-bottom">
                <p>
                    © 2026 MoviesHub. All rights reserved.
                </p>

                <a href="#top" className="footer-back">
                    Back to top ↑
                </a>
            </div>
        </footer>
    );
};

export default Footer;