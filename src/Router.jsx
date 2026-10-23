
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Popular from "./pages/Popular";
import Details from "./pages/Details";

const Router = ({ filters }) => {
    return (
        <Routes>
            <Route
                path="/"
                element={<Home filters={filters} />}
            />

            <Route
                path="/movies"
                element={<Movies filters={filters} />}
            />

            <Route
                path="/popular"
                element={<Popular filters={filters} />}
            />

            <Route
                path="/details/:mediaType/:id"
                element={<Details />}
            />
        </Routes>
    );
};

export default Router;
