
import { useState } from "react";
import "./Filter.css";

const genres = [
    { id: "", name: "All genres" },
    { id: "28", name: "Action" },
    { id: "35", name: "Comedy" },
    { id: "27", name: "Horror" },
    { id: "18", name: "Drama" },
    { id: "878", name: "Sci-Fi" },
];

export const Filter = ({ onFilter }) => {
    const [search, setSearch] = useState("");
    const [genre, setGenre] = useState("");

    const handleFilter = (
        newSearch = search,
        newGenre = genre
    ) => {
        onFilter?.({
            search: newSearch,
            genre: newGenre,
        });
    };

    return (
        <section className="filter">
            <div className="filter-row">
                <div className="search-box">
                    <span className="search-icon">⌕</span>

                    <input
                        type="text"
                        placeholder="Search movies..."
                        value={search}
                        onChange={(e) => {
                            const value = e.target.value;
                            setSearch(value);
                            handleFilter(value, genre);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleFilter();
                            }
                        }}
                    />
                </div>

                <select
                    className="genre-select"
                    value={genre}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                >
                    {genres.map((item) => (
                        <option key={item.id} value={item.id}>
                            Genre: {item.name}
                        </option>
                    ))}
                </select>

                <button
                    className="filter-button"
                    onClick={() => handleFilter()}
                >
                    Filter
                </button>
            </div>
        </section>
    );
};

export default Filter;
