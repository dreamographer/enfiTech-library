import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { useState } from "react";
import Protected from "./components/protectRoute";
function App() {
  const [login,setLogin]=useState(true) //Dummy login status can be update with actual authentication
  return (
    <Router>
      <Routes>
        {/* home route */}
        <Route
          path="/"
          element={
            // making it protected so that only registerd users can acces
            <Protected isLoggedIn={login} >
              <Home />
            </Protected>
          }
        />
        <Route path="/register" element={<Signup  setLogin={()=>setLogin(true)} />} />{"user REgistration"}
      </Routes>
    </Router>
  );
}


export default App;
