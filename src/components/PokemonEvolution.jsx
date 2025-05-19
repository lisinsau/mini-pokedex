import React, { useEffect, useState } from "react";
import PokeCard from "./PokeCard";

function extractEvolutions(chain) {
    const evolutions = [];

    const traverse = (node) => {
        evolutions.push({
            name: node.species.name,
            url: node.species.url,
        });
        node.evolves_to.forEach(traverse);
    };

    traverse(chain);
    return evolutions;
}

function PokemonEvolution(props) {
    const [evolutions, setEvolutions] = useState([]);
    const [hasEvolutions, setHasEvolutions] = useState(false);

    useEffect(() => {
        const fetchEvolutionData = async () => {
            const evolutionRes = await fetch(props.speciesData);
            const evolutionData = await evolutionRes.json();

            const hasEvo = evolutionData.chain.evolves_to.length > 0;
            setHasEvolutions(hasEvo);

            const evolutionNames = extractEvolutions(evolutionData.chain);
            console.log(evolutionNames);
            const fullEvolutions = await Promise.all(
                evolutionNames.map(async ({ url }) => {
                    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${url.split("/").filter(Boolean).pop()}`);
                    return await res.json();
                })                
            );

            setEvolutions(fullEvolutions);
        }

        fetchEvolutionData();
    }, [props.id, props.speciesData]);

    return (
        <div className="pokemon-evolution">
            {hasEvolutions 
                ? <>{evolutions.map((poke, index) => (
                    <React.Fragment key={poke.id}>
                        <PokeCard
                            
                            id={poke.id}
                            name={poke.name}
                            sprite={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`}
                            types={poke.types.map(t => t.type.name)}
                            isActive={poke.id.toString() === props.id}/>
                        {index < evolutions.length - 1 && (
                            <span className="evolution-arrow">↓</span>
                        )}
                    </React.Fragment>
                ))}</>
                : <p>This Pokemon has no evolution.</p>}
        </div>
    )
}

export default PokemonEvolution;