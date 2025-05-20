import { Link } from "react-router-dom";
import "./Homepage.css";
import TypeIcon from "../components/TypeIcon";

const pokemonTypes = [
  { type: "normal", color: "#a1a3a0" },
  { type: "fire", color: "#ffae76" },
  { type: "water", color: "#92b8f7" },
  { type: "grass", color: "#8ddc8a" },
  { type: "electric", color: "#fed856" },
  { type: "ice", color: "#a9e7e7" },
  { type: "fighting", color: "#f07973" },
  { type: "poison", color: "#d584c5" },
  { type: "ground", color: "#eec770" },
  { type: "flying", color: "#cdb8f7" },
  { type: "psychic", color: "#ff93b5" },
  { type: "bug", color: "#c3d267" },
  { type: "rock", color: "#d8c27a" },
  { type: "ghost", color: "#A993BF" },
  { type: "dragon", color: "#B07EFE" },
  { type: "dark", color: "#A99389" },
  { type: "steel", color: "#2296A4" },
  { type: "fairy", color: "#FFB1C0" },
];

function TypesList() {
    return (
        <div style={{ padding: "20px" }}>
            <div className="title-container">
                <Link to={`/`} className="left-arrow">
                    <svg viewBox="0 0 330 330">
                        <path id="XMLID_92_" d="M111.213,165.004L250.607,25.607c5.858-5.858,5.858-15.355,0-21.213c-5.858-5.858-15.355-5.858-21.213,0.001
                        l-150,150.004C76.58,157.211,75,161.026,75,165.004c0,3.979,1.581,7.794,4.394,10.607l150,149.996
                        C232.322,328.536,236.161,330,240,330s7.678-1.464,10.607-4.394c5.858-5.858,5.858-15.355,0-21.213L111.213,165.004z"/>
                    </svg>
                </Link>
                <h1>Types</h1>
            </div>
            <div className="types-container">
                {pokemonTypes.map(({ type, color }) => (
                    <Link to={`/pokedex?type=${type}`} key={type} className="type-container" style={{ "--type-color" : color, backgroundColor: color }}>
                        <p>{type.charAt(0).toUpperCase() + type.slice(1)}</p>
                        <TypeIcon type={type} color="#ffffff" />
                    </Link>
                ))}
            </div>            
        </div>
    )
}

export default TypesList;