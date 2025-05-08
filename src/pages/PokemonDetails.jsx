import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function PokemonDetails(){
    const {id} = useParams();
    const [pokemon, setPokemon] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((res) => res.json())
            .then((data) => setPokemon(data));
    }, [id]);

    if (!pokemon) return <p>Chargement...</p>;

    return(
        <div className="pokemon-detail">
        <button onClick={() => navigate(-1)}>Retour</button>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Type: {pokemon.types.map(t => t.type.name).join(", ")}</p>
      <p>Poids: {pokemon.weight / 10} kg</p>
      <p>Taille: {pokemon.height / 10} m</p>
    </div>
    )
}

export default PokemonDetails;