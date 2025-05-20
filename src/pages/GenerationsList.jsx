import { Link } from "react-router-dom";
import "./Homepage.css";

const pokemonGenerations = [
    { number: 1, color: " #1167e9, #1EA92D, #fddf11, #f4092b", starter:[1, 4, 7]},
    { number: 2, color: " #fdc828, white, #3699c3", starter:[152, 155, 158]},
    { number: 3, color: " #9f0631, #3953c7, #258769", starter:[252, 255, 258]},
    { number: 4, color: " #35327d, #fab7d0, #8e92a2", starter:[387, 390, 393]},
    { number: 5, color: " black, white, #e76929, #03affe", starter:[495, 498, 501]},
    { number: 6, color: " #5933db, #c31024", starter:[650, 653, 656]},
    { number: 7, color: " #f48a26, #300c8a", starter:[722, 725, 728]},
    { number: 8, color: " #00adef, #ED1166", starter:[810, 813, 816]},
    { number: 9, color: " #d90c1f, #7c2880", starter:[906, 909, 912]},
];

function GenerationsList() {
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
                <h1>Generations</h1>
            </div>
            <div className="generations-container">
                {pokemonGenerations.map(({ number, color, starter }) => (
                    <Link to={`/pokedex?generation=${number}`} key={number} className="generation-container" style={{ "--generation-color" : color }}>
                        <p>Generation {number}</p>
                        <div className="generation-gradient"></div>
                        <div className="generation-img">
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${starter[0]}.png`} alt={`Pokemon number ${starter[0]}`}/>
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${starter[1]}.png`} alt={`Pokemon number ${starter[1]}`}/>
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${starter[2]}.png`} alt={`Pokemon number ${starter[2]}`}/>
                        </div>
                    </Link>
                ))}
            </div>            
        </div>
    )
}

export default GenerationsList;