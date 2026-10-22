
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    const closeMenu = () => setMenuOpen(false);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Movies", path: "/movies" },
        { name: "Popular", path: "/popular" },
    ];

    return (
        <header className="header">
            <Link to="/" className="header-logo" onClick={closeMenu}>
                Movies<span>Hub</span>
            </Link>

            <button
                className={`burger-menu ${menuOpen ? "open" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="header-navigation"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <nav
                id="header-navigation"
                className={`header-nav ${menuOpen ? "nav-open" : ""}`}
            >
                {navLinks.map((link) => (
                    <Link
                        key={link.path}
                        className={`header-link ${location.pathname === link.path ? "active" : ""
                            }`}
                        to={link.path}
                        onClick={closeMenu}
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>
        </header>
    );
};

export default Header;
