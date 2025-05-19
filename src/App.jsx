import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Pokedex from "./pages/Pokedex";
import PokemonDetails from "./pages/PokemonDetails";
import "./App.css";
import TypesList from "./pages/TypesList";

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/types" element={<TypesList/>}/>
        <Route path="/pokedex" element={<Pokedex/>}/>
        <Route path="/pokemon/:id" element={<PokemonDetails/>}/>
      </Routes>
    </Router>
  );
}

export default App;