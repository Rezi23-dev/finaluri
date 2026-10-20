import React from 'react'
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <a href="/" className="header-logo">
                Movies<span>Hub</span>
            </a>

            <nav className="header-nav">
                <a href="/" className="header-link active">Home</a>
                <a href="#movies" className="header-link">Movies</a>
                <a href="#popular" className="header-link">Popular</a>
            </nav>


        </header>
    )
}

export default Header

