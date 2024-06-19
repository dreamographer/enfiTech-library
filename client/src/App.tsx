import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { useState } from "react";
import Protected from "./components/protectRoute";
function App() {
  const [login,setLogin]=useState(false)
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Protected isLoggedIn={login} >
              <Home />
            </Protected>
          }
        />
        <Route path="/register" element={<Signup  setLogin={setLogin} />} />{" "}
      </Routes>
    </Router>
  );
}


export default App;
