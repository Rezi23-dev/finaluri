
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import "./Filter.css";

const Filter = ({ onFilter }) => {
    const [search, setSearch] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        onFilter?.({
            search: search.trim(),
            genre: "",
        });
    };

    const handleReset = () => {
        setSearch("");

        onFilter?.({
            search: "",
            genre: "",
        });
    };

    return (
        <section className="filter" aria-label="Movie search">
            <form className="filter-row" onSubmit={handleSubmit}>
                <div className="search-box">
                    <Search size={20} aria-hidden="true" />



                    <input
                        id="movie-search"
                        type="search"
                        placeholder="Search movies..."
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                    />
                </div>

                <button className="filter-button" type="submit">
                    <SlidersHorizontal size={17} aria-hidden="true" />
                    <span>Filter</span>
                </button>


            </form>
        </section>
    );
};

export { Filter };
