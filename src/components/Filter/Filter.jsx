
import { useState } from "react";
import "./Filter.css";

const SearchIcon = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
    </svg>
);

const FilterIcon = () => (
    <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M4 7h16M7 12h10m-7 5h4" />
    </svg>
);

const Filter = ({ onFilter }) => {
    const [search, setSearch] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        onFilter?.({
            search: search.trim(),
            genre: "",
        });
    };

    return (
        <section className="filter" aria-label="Movie search">
            <form className="filter-row" onSubmit={handleSubmit}>
                <div className="search-box">
                    <SearchIcon />

                    <input
                        id="movie-search"
                        type="search"
                        placeholder="Search movies..."
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        aria-label="Search movies"
                    />
                </div>

                <button className="filter-button" type="submit">
                    <FilterIcon />
                    <span>Filter</span>
                </button>
            </form>
        </section>
    );
};

export { Filter };
