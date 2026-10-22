import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Router from "./Router";
import "./App.css";
import Banner from "./components/Banner/Banner";
import { Filter } from "./components/Filter/Filter";

function App() {
  return (
    <div className="app">
      <Header />
      <Banner />
      <Filter />
      <main className="main-content">
        <Router />
      </main>
      <Footer />
    </div>
  );
}

export default App;