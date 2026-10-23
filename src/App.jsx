
import { useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Router from "./Router";
import "./App.css";
import Banner from "./components/Banner/Banner";
import { Filter } from "./components/Filter/Filter";

function App() {
  const [filters, setFilters] = useState({
    search: "",
    genre: "",
  });

  return (
    <div className="app">
      <Header />
      <Banner />

      <Filter onFilter={setFilters} />

      <main className="main-content">
        <Router filters={filters} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
