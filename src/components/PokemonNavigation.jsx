import { Link } from "react-router-dom";

function PokemonNavigation(props){
    const ids = props.validIds;
    if (!ids || ids.length === 0) return null;
    
    const currentIndex = ids.indexOf(String(props.id));

    const nextId = ids[currentIndex + 1];
    const prevId = ids[currentIndex - 1];

    const from = props.from;

    return (
        <div className="pokemon-navigation">
                {prevId && (
                    <Link to={`/pokemon/${prevId}`} state={{ filteredIds: ids, from }} className="left-arrow">
                        <svg viewBox="0 0 330 330">
                            <path id="XMLID_92_" d="M111.213,165.004L250.607,25.607c5.858-5.858,5.858-15.355,0-21.213c-5.858-5.858-15.355-5.858-21.213,0.001
                            l-150,150.004C76.58,157.211,75,161.026,75,165.004c0,3.979,1.581,7.794,4.394,10.607l150,149.996
                            C232.322,328.536,236.161,330,240,330s7.678-1.464,10.607-4.394c5.858-5.858,5.858-15.355,0-21.213L111.213,165.004z"/>
                        </svg>
                    </Link>
                )}
                {nextId && (
                    <Link to={`/pokemon/${nextId}`} state={{ filteredIds: ids, from }} className="right-arrow">
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