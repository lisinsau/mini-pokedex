import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PokemonNavigation(props){

    const [validIds, setValidIds] = useState([]);

    useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon-species?limit=2000')
        .then(res => res.json())
        .then(data => {
        const ids = data.results.map((_, index) => index + 1);
        setValidIds(ids);
        });
    }, []);
    
    const currentIndex = validIds.indexOf(props.id);
    const nextId = validIds[currentIndex + 1];
    const prevId = validIds[currentIndex - 1];

    return (
        <div className="pokemon-navigation">
                {props.id !== 1 && (
                    <Link to={`/pokemon/${prevId}`} className="left-arrow">
                        <svg viewBox="0 0 330 330">
                            <path id="XMLID_92_" d="M111.213,165.004L250.607,25.607c5.858-5.858,5.858-15.355,0-21.213c-5.858-5.858-15.355-5.858-21.213,0.001
                            l-150,150.004C76.58,157.211,75,161.026,75,165.004c0,3.979,1.581,7.794,4.394,10.607l150,149.996
                            C232.322,328.536,236.161,330,240,330s7.678-1.464,10.607-4.394c5.858-5.858,5.858-15.355,0-21.213L111.213,165.004z"/>
                        </svg>
                    </Link>
                )}
                {props.id !== 1025 && (
                    <Link to={`/pokemon/${nextId}`} className="right-arrow">
                        <svg viewBox="0 0 330 330">
                            <path id="XMLID_92_" d="M111.213,165.004L250.607,25.607c5.858-5.858,5.858-15.355,0-21.213c-5.858-5.858-15.355-5.858-21.213,0.001
                            l-150,150.004C76.58,157.211,75,161.026,75,165.004c0,3.979,1.581,7.794,4.394,10.607l150,149.996
                            C232.322,328.536,236.161,330,240,330s7.678-1.464,10.607-4.394c5.858-5.858,5.858-15.355,0-21.213L111.213,165.004z"/>
                        </svg>
                    </Link>
                )}
                
            </div>
    )
}

export default PokemonNavigation;