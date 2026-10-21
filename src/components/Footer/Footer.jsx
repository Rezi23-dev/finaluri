import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-brand">
                    <a href="/" className="footer-logo">
                        Movies<span>Hub</span>
                    </a>

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