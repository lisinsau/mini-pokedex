import { useState } from "react";

import PokemonAbout from "./PokemonAbout";
import PokemonStats from "./PokemonStats";
import PokemonEvolution from "./PokemonEvolution";

function PokemonInfos(props) {
    const [pokemonInfos, setPokemonInfos] = useState(1);

    return (
        <div style={{display:"flex",
                    flexDirection: "column",
                    alignItems: "center",
                    overflowY : "scroll"}}>
            <div className="button-container">
                <button className={pokemonInfos === 1 ? "active" : ""} onClick={() => setPokemonInfos(1)}>About</button>
                <button className={pokemonInfos === 2 ? "active" : ""} onClick={() => setPokemonInfos(2)}>Status</button>
                <button className={pokemonInfos === 3 ? "active" : ""} onClick={() => setPokemonInfos(3)}>Evolution</button>
            </div>
            <div style={{width: "100%", maxWidth: "600px"}}>
                {pokemonInfos === 1
                    ? <PokemonAbout
                        description = {props.pokemon.description}
                        height = {props.pokemon.height}
                        weight = {props.pokemon.weight}
                        genderRate = {props.pokemon.genderRate}
                        captureRate = {props.pokemon.captureRate}
                        generation = {props.pokemon.generation}
                        />
                    : pokemonInfos === 2
                        ? <PokemonStats
                            stats = {props.pokemon.stats}
                            />
                        : <PokemonEvolution
                            speciesData = {props.speciesData.evolution_chain.url}
                            id = {props.id}
                        />}
            </div>
        </div>
    )
}

export default PokemonInfos;