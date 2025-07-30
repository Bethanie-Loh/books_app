import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppBar from "./components/appbar";
import Home from "./pages/home";
import Fiction from "./pages/fiction";
import Non_Fiction from "./pages/non_fiction";

function App() {
  return (
    <div>
      <AppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fiction" element={<Fiction />} />
        <Route path="/non-fiction" element={<Non_Fiction />} />
      </Routes>
    </div>
  );
}

export default App;
