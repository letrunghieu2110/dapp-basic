import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./layouts/Headers";
import Main from "./layouts/Main";
import HomePage from "./pages/HomePage/Home";
import AboutPage from "./pages/About/About";

function App() {
  return (
    <div className="App">
      <Header />
      <Main>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Router>
      </Main>
    </div>
  );
}

export default App;
