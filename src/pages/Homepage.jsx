import { useEffect, useState } from "react";
import PokeCard from "../components/PokeCard";
import "./Homepage.css";

function Homepage(){
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=898")
        .then((res) => res.json())
        .then((data) => {
        const fetches = data.results.map(poke => 
            fetch(poke.url)
            .then((res) => res.json())
        );
        Promise.all(fetches).then((details) => {
            setPokemonList(details);
        });
        });
    }, []);

    return (
        <div className="homepage-container">
            <h1>Mini Pokédex</h1>
            <div className="pokedex-container">
                {pokemonList.map((poke) => (
                    <PokeCard
                        key={poke.id}
                        id={poke.id}
                        name={poke.name}
                        sprite={poke.sprites.versions["generation-v"]["black-white"].front_default}
                        types={poke.types}
                    />
                ))}
            </div>
        </div>
    );
}

export default Homepage;