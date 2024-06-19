import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Home from "./components/Home";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/register" element={<Signup />} />{" "}
      </Routes>
    </Router>
  );
}


export default App;
