import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Router from "./Router";
import "./App.css";
import Banner from "./components/Banner/Banner";

function App() {
  return (
    <div className="app">
      <Header />
      <Banner />
      <main className="main-content">
        <Router />
      </main>

      <Footer />
    </div>
  );
}

export default App;