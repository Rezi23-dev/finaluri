
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Movies = lazy(() => import("./pages/Movies"));
const Popular = lazy(() => import("./pages/Popular"));
const Details = lazy(() => import("./pages/Details"));

function Router() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/popular" element={<Popular />} />
                <Route path="/details/:id" element={<Details />} />
            </Routes>
        </Suspense>
    );
}

export default Router;
