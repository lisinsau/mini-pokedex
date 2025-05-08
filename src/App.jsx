import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import PokemonDetails from "./pages/PokemonDetails";
import "./App.css";

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/pokemon/:id" element={<PokemonDetails/>}/>
      </Routes>
    </Router>
  );
}

export default App;