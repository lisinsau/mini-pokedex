import { useEffect, useState } from "react";

function App(){
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
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
    <div>
      {pokemonList.map(poke => 
        <div key={poke.id}>
          <img src={poke.sprites.front_default} alt={poke.name}/>
          <p>{poke.name}</p>
        </div>
      )}
    </div>
  );
}

export default App;