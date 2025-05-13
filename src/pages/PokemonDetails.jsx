import React from "react";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./PokemonDetails.css";
import StatsBar from "../components/StatsBar";
import PokeCard from "../components/PokeCard";

const typeColors = {
    fire: "#ffae76",
    water: "#92b8f7",
    grass: "#8ddc8a",
    electric: "#fed856",
    bug: "#c3d267",
    normal: "#a1a3a0",
    poison: "#d584c5",
    ground: "#eec770",
    psychic: "#ff93b5",
    rock: "#d8c27a",
    ghost: "#A993BF",
    dark: "#A99389",
    dragon: "#B07EFE",
    steel: "#2296A4",
    fairy: "#FFB1C0",
    fighting: "#f07973",
    ice: "#a9e7e7",
    flying: "#cdb8f7"
  };

function adjustPokemonSprite(imgElement) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = imgElement.naturalWidth;
        canvas.height = imgElement.naturalHeight;

        // Dessine l'image dans le canvas
        ctx.drawImage(imgElement, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        let top = canvas.height;
        let bottom = 0;
        let left = canvas.width;
        let right = 0;

        // Trouve les pixels opaques
        for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
            const index = (y * canvas.width + x) * 4;
            const alpha = data[index + 3];

            if (alpha > 10) {
                if (x < left) left = x;
                if (x > right) right = x;
                if (y < top) top = y;
                if (y > bottom) bottom = y;
            }
            }
        }

        const spriteWidth = right - left;
        const spriteHeight = bottom - top;

        const maxSize = 75; // par exemple, cadre de 80px
        const scale = Math.min(maxSize / spriteWidth, maxSize / spriteHeight);

        imgElement.style.transform = `scale(${scale})`;
        imgElement.style.transformOrigin = "center center";
    }

function extractEvolutions(chain) {
    const evolutions = [];

    let current = chain;
    while (current) {
        evolutions.push(current.species.name);
        if (current.evolves_to.length > 0) {
            current = current.evolves_to[0]; // tu peux gérer les branches multiples si besoin
        } else {
            current = null;
        }
    }

    return evolutions;
 }

function PokemonDetails(){
    const location = useLocation();
    const bgColor = location.state?.bgColor || "#ccc";
    const {id} = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [pokemonInfos, setPokemonInfos] = useState(1);
    const navigate = useNavigate();
    const imgRef = useRef(null);
    const [evolutions, setEvolutions] = useState([]);
    const [hasEvolutions, setHasEvolutions] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await res.json();

            const stats = data.stats.reduce((acc, statObj) => {
                const statName = statObj.stat.name;
                acc[statName] = statObj.base_stat;
                return acc;
            }, {});

            const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
            const speciesData = await speciesRes.json();

            const genderRate = speciesData.gender_rate;
            const captureRate = speciesData.capture_rate;
            const entry = speciesData.flavor_text_entries.find(
                (entry) => entry.language.name === "en"
            );
            const description = entry ? entry.flavor_text.replace(/\f/g, " ") : "Description non trouvée.";
            
            const evolutionChainUrl = speciesData.evolution_chain.url;
            const evolutionRes = await fetch(evolutionChainUrl);
            const evolutionData = await evolutionRes.json();

            const chain = evolutionData.chain;
            const hasEvo = chain.evolves_to.length > 0;
            setHasEvolutions(hasEvo);

            const evolutionNames = extractEvolutions(evolutionData.chain);

            const fullEvolutions = await Promise.all(
                evolutionNames.map(async name => {
                    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                    return await res.json();
                })
            );
            setEvolutions(fullEvolutions);
            setPokemon({ ...data, description, stats, genderRate, captureRate });            
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        const img = imgRef.current;
        if (!img) {
            return;
        }

        const handleLoad = () => {
            adjustPokemonSprite(img);
        };

        if (img.complete) {
        handleLoad();
        } else {
        img.onload = handleLoad;
        }
        
    }, [pokemon]);

    if (!pokemon) return <p>Chargement...</p>;

    const formattedId = `#${String(pokemon.id).padStart(3, '0')}`;
    const mainType = pokemon.types[0].type.name;
    const typeColor = typeColors[mainType] || "#AAA";
    let type2Color;
    
    if(pokemon.types[1]){
        const secondType = pokemon.types[1].type.name;
        type2Color = typeColors[secondType] || "#AAA";
    }
    else{
        type2Color = typeColors[mainType] || "#AAA";
    }

    const weightKg = pokemon.weight / 10;
    const weightLbs = (weightKg * 2.20462).toFixed(1);

    const heightM = pokemon.height / 10;
    const heightInches = heightM * 39.3701;
    const heightFeet = Math.floor(heightInches / 12);
    const remainingInches = Math.round(heightInches % 12);
    const femaleRate = pokemon.genderRate >= 0 ? (pokemon.genderRate / 8) * 100 : null;
    const maleRate = pokemon.genderRate >= 0 ? 100 - femaleRate : null;
    const catchRatePercent = Math.round((pokemon.captureRate / 255) * 100);

    const about = (
        <div className="pokemon-about">
            <p className="pokemon-description">{pokemon.description}</p>
            <div className="pokemon-measurements">
                <div className="measurement-row">
                    <p className="label">Height</p>
                    <p className="imperial">{heightFeet}'{remainingInches}"</p>
                    <p className="metric">{heightM} m</p>
                </div>
                <div className="measurement-row">
                    <p className="label">Weight</p>
                    <p className="imperial">{weightLbs} lbs</p>
                    <p className="metric">{weightKg} kg</p>
                </div>
            </div>
            <div className="measurement-row">
                <p className="label">Gender ratio</p>
                {pokemon.genderRate === -1 ? (
                    <p className="imperial">Genderless</p>
                ) : (<>
                    <p className="male-rate"> ♂ {maleRate}% </p>
                    <p className="female-rate"> ♀ {femaleRate}%</p></>
                )}
            </div>
            <div className="measurement-row">
                <p className="label">Capture rate</p>
                <p className="catch-rate">{catchRatePercent}%</p>
            </div>
        </div>
    );

    const status = (
        <div className="pokemon-status">
            <StatsBar delay="0" name="hp" color="#ff5959" number={pokemon.stats.hp}/>
            <StatsBar delay="0.1" name="atk" color="#ffae76" number={pokemon.stats.attack}/>
            <StatsBar delay="0.2" name="def" color="#ffe171" number={pokemon.stats.defense}/>
            <StatsBar delay="0.3" name="satk" color="#92b8f7" number={pokemon.stats["special-attack"]}/>
            <StatsBar delay="0.4" name="sdef" color="#88db86" number={pokemon.stats["special-defense"]}/>
            <StatsBar delay="0.5" name="spd" color="#ff93b5" number={pokemon.stats.speed}/>
        </div>
    );

    const evolution = (
        <div className="pokemon-evolution">
            {hasEvolutions 
                ? <>{evolutions.map((poke, index) => (
                    <React.Fragment key={poke.id}>
                        <PokeCard
                            
                            id={poke.id}
                            name={poke.name}
                            sprite={poke.sprites.versions["generation-v"]["black-white"].front_default}
                            types={poke.types}
                            isActive={poke.id.toString() === id}/>
                        {index < evolutions.length - 1 && (
                            <span className="evolution-arrow">↓</span>
                        )}
                    </React.Fragment>
                ))}</>
                : <p>This Pokemon has no evolution.</p>}
        </div>
    );

    return(
        <div className="pokemon-detail" style={{ "--bg-color": bgColor, "--type-color" : typeColor, "--type2-color" : type2Color}}>
            <div className="pokemon-header">
                <button onClick={() => navigate("/")}>Retour</button>
                <h1>{pokemon.name}</h1>
                <p>{formattedId}</p>
            </div>
            <div className="pokemon-body">
                <div style={{position: "relative"}}>
                    <div className="pokemon-image-container">
                        <div className="pokemon-image">
                            <div className="pokemon-pokeball">
                                <svg className="pokeball-svg" viewBox="0 0 980 978.94">                            
                                    <path d="M770,1224.85H732c-1.49-1-3.21-.74-4.85-.82-43.27-1.91-85.66-9.09-126.64-23.08-151.15-51.57-254.79-152.44-311.12-301.58-14.9-39.48-23.16-80.65-26.63-122.76-.55-6.76-.06-13.62-1.76-20.28v-43a58.81,58.81,0,0,0,.89-5.86,461,461,0,0,1,17.86-106.37q47-160.89,181.91-260.55C529.06,290.81,604.73,261,687.76,250a479.9,479.9,0,0,1,103.69-2.35c37.6,3.17,74.47,9.93,110.19,22q208.55,70.45,299,271.14c21.87,48.51,34.17,99.72,38.6,152.8.58,6.92.1,13.95,1.8,20.77v42c-.3,2.1-.78,4.2-.88,6.31A464.49,464.49,0,0,1,1222.35,869q-43.32,149.69-164.66,247.69Q941,1210.57,791.31,1223.07C784.21,1223.67,777,1223.05,770,1224.85ZM438.72,766.6h-96c-7.34,0-7.35,0-6.51,7.5a455.59,455.59,0,0,0,7.62,48.7q32.9,148.47,153,241.88c65.33,50.8,139.8,79.07,222.48,85.42,48.25,3.71,96,.07,142.34-13.67,136.22-40.33,229.87-127.25,281-259.63,12.92-33.47,19.88-68.48,23.33-104.17.33-3.46.83-6.17-4.62-6.16q-98,.3-196,0c-3.42,0-4.7,1.17-5.18,4.31-.71,4.59-1.53,9.17-2.63,13.68-27.08,111-135,180.24-247.43,158.68-85.94-16.48-153.58-85.58-168.15-171.85-.58-3.44-1.83-4.87-5.73-4.85C503.71,766.68,471.21,766.6,438.72,766.6Zm165.37-31.32C604.13,815.92,670.26,882,751,882s146.87-66,146.94-146.66S831.91,588.73,751,588.69,604.05,654.66,604.09,735.28Z" transform="translate(-261 -245.91)"/>
                                </svg>
                                <div className="pokemon-radial"></div>
                            </div>                        
                            <img
                                className="pokemon-img"
                                ref={imgRef}
                                crossOrigin="anonymous"
                                src={pokemon.sprites.versions["generation-v"]["black-white"].front_default}
                                alt={pokemon.name} />
                        </div>
                        <div className="clipped-circle"></div>                    
                    </div>
                    <div className="pokemon-types">
                        <p className="pokemon-main-type">{pokemon.types[0].type.name}</p>
                        {pokemon.types[1] && (
                            <p className="pokemon-second-type">{pokemon.types[1].type.name}</p>
                        )}
                    </div>
                </div>
                <div style={{display:"flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"}}>
                    <div className="button-container">
                        <button className={pokemonInfos === 1 ? "active" : ""} onClick={() => setPokemonInfos(1)}>About</button>
                        <button className={pokemonInfos === 2 ? "active" : ""} onClick={() => setPokemonInfos(2)}>Status</button>
                        <button className={pokemonInfos === 3 ? "active" : ""} onClick={() => setPokemonInfos(3)}>Evolution</button>
                    </div>
                    <div style={{width: "100%", maxWidth: "600px"}}>
                        {pokemonInfos === 1
                            ? about
                            : pokemonInfos === 2
                                ? status
                                : evolution}
                    </div>
                    
                </div>
            </div>            
        </div>
    )
}

export default PokemonDetails;