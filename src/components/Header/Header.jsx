import React from 'react';
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
    return (

        <header className="header">
            <Link to="/" className="header-logo">
                Movies<span>Hub</span>
            </Link>

            <nav className="header-nav">
                <Link className="header-link" to="/">
                    Home
                </Link>

                <Link className="header-link" to="/movies">
                    Movies
                </Link>

                <Link className="header-link" to="/popular">
                    Popular
                </Link>
            </nav>
        </header>


    );
};

export default Header;