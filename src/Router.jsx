
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Popular from "./pages/Popular";
import Details from "./pages/Details";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/details/:mediaType/:id" element={<Details />} />
        </Routes>
    );
};

export default Router;
