import { useEffect, useState, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PokeCard from "../components/PokeCard";
import "./Pokedex.css";

const limit = 50;
const totalPokemon = 1025;

function Homepage() {
    const [pokemonList, setPokemonList] = useState([]);
    const [allPokemonList, setAllPokemonList] = useState([]);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const loaderRef = useRef(null);
    const [hasMore, setHasMore] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [searchParams] = useSearchParams();
    const typeFilter = searchParams.get("type");
    const generationFilter = searchParams.get("generation");

    const isSearching = debouncedSearch.trim() !== "";

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedSearch(searchTerm), 300);
        return () => clearTimeout(handler);
    }, [searchTerm]);

     useEffect(() => {
        setSearchTerm("");
        setDebouncedSearch("");
    }, [typeFilter, generationFilter]);

    useEffect(() => {
        if (!typeFilter && !generationFilter && debouncedSearch === "") {
            setPokemonList([]);
            setPage(0);
            setHasMore(true);
        }
    }, [typeFilter, generationFilter, debouncedSearch]);

    useEffect(() => {
        const fetchPokemonDetails = async (urls) => {
            const details = await Promise.all(urls.map(async (url) => {
                try {
                    const id = url.split("/").filter(Boolean).pop();
                    if (id > totalPokemon) return null;
                    const res = await fetch(url);
                    const detail = await res.json();
                    return {
                        id,
                        name: detail.name,
                        types: detail.types.map(t => t.type.name),
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
                    };
                } catch {
                    return null;
                }
            }));
            return details.filter(Boolean);
        };

        const fetchFiltered = async () => {
            setIsLoading(true);
            let urls = [];

            if (typeFilter) {
                const res = await fetch(`https://pokeapi.co/api/v2/type/${typeFilter}`);
                const data = await res.json();
                urls = data.pokemon.map(p => p.pokemon.url);
            }
            if (generationFilter) {
                const res = await fetch(`https://pokeapi.co/api/v2/generation/${generationFilter}`);
                const data = await res.json();
                const genUrls = data.pokemon_species
                    .map(species => {
                        const id = species.url.split("/").filter(Boolean).pop();
                        return {
                            id: parseInt(id, 10),
                            url: `https://pokeapi.co/api/v2/pokemon/${id}`,
                        };
                    })
                    .sort((a, b) => a.id - b.id)

                    .map(obj => obj.url);

                urls = typeFilter
                    ? urls.filter(url => genUrls.includes(url))
                    : genUrls;
            }

            urls = Array.from(new Set(urls)).slice(0, 200);
            const details = await fetchPokemonDetails(urls);
            setPokemonList(details);
            setIsLoading(false);
            setHasMore(false);
        };

        if (typeFilter || generationFilter) fetchFiltered();
    }, [typeFilter, generationFilter]);

    useEffect(() => {
        const fetchPage = async () => {
            if (typeFilter || generationFilter || isSearching) return;

            const offset = page * limit;
            if (offset >= totalPokemon) {
                setHasMore(false);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
            const data = await res.json();
            const details = await Promise.all(
                data.results.map(async ({ url }) => {
                    const id = url.split("/").filter(Boolean).pop();
                    if (id > totalPokemon) return null;
                    const res = await fetch(url);
                    const detail = await res.json();
                    return {
                        id,
                        name: detail.name,
                        types: detail.types.map(t => t.type.name),
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
                    };
                })
            );

            const validDetails = details.filter(Boolean);
            if (page === 0) {
                setPokemonList(validDetails);
            } else {
                setPokemonList((prev) => [...prev, ...validDetails]);
            }
            setIsLoading(false);
            if (validDetails.length < limit) setHasMore(false);
        };

        if (!isSearching) {
            fetchPage();
        }
    }, [page, typeFilter, generationFilter, isSearching]);

    useEffect(() => {
        const fetchAll = async () => {
            if (!debouncedSearch || typeFilter || generationFilter) return;

            const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${totalPokemon}`);
            const data = await res.json();

            const details = await Promise.all(
                data.results.map(async ({ url }) => {
                    const id = url.split("/").filter(Boolean).pop();
                    const res = await fetch(url);
                    const detail = await res.json();
                    return {
                        id,
                        name: detail.name,
                        types: detail.types.map(t => t.type.name),
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
                    };
                })
            );

            setAllPokemonList(details.filter(Boolean));
        };

        fetchAll();
    }, [debouncedSearch, typeFilter, generationFilter]);

    useEffect(() => {
        if (typeFilter || generationFilter || isSearching) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !isLoading && hasMore) setPage(p => p + 1);
        }, { threshold: 1 });

        const loader = loaderRef.current;
        if (loader) observer.observe(loader);
        return () => loader && observer.unobserve(loader);
    }, [isLoading, hasMore, typeFilter, generationFilter, isSearching]);

    const searchBaseList = typeFilter || generationFilter ? pokemonList : allPokemonList;

    const filteredPokemons = debouncedSearch
        ? searchBaseList.filter(pokemon =>
            pokemon.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            pokemon.id.toString() === debouncedSearch
        )
        : (typeFilter || generationFilter ? pokemonList : pokemonList);

        const fallbackIds = Array.from({ length: 1025 }, (_, i) => (i + 1).toString());
    return (
        <div className="page-container">
            <div className="title-container">
                <Link to={typeFilter 
                            ? `../types`
                            : generationFilter 
                                ? `../generations`
                                : `/`               
                        } 
                        className="left-arrow">
                    <svg viewBox="0 0 330 330">
                        <path id="XMLID_92_" d="M111.213,165.004L250.607,25.607c5.858-5.858,5.858-15.355,0-21.213c-5.858-5.858-15.355-5.858-21.213,0.001
                        l-150,150.004C76.58,157.211,75,161.026,75,165.004c0,3.979,1.581,7.794,4.394,10.607l150,149.996
                        C232.322,328.536,236.161,330,240,330s7.678-1.464,10.607-4.394c5.858-5.858,5.858-15.355,0-21.213L111.213,165.004z"/>
                    </svg>
                </Link>
                <h1>
                    {typeFilter 
                        ? `${typeFilter.charAt(0).toUpperCase() + typeFilter.slice(1)} type`
                        : generationFilter 
                            ? `Generation ${generationFilter}`
                            : "Full Pokédex"                    
                    }                    
                </h1>
            </div>
            <div className="search-div">
                <input
                    type="text"
                    placeholder="Rechercher un Pokémon..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>
            <div className="pokedex-container">
                {
                filteredPokemons.map((poke) => (
                    <PokeCard key={poke.id} {...poke} filteredIds={typeFilter 
                                                                        ? filteredPokemons.map(p => p.id)
                                                                        : generationFilter 
                                                                            ?filteredPokemons.map(p => p.id)
                                                                            :fallbackIds
                                                                    }
                    />
                ))}
            </div>
            {!isLoading && filteredPokemons.length === 0 && (
                <p className="no-result">Aucun Pokémon trouvé 😢</p>
            )}
            <div ref={loaderRef} style={{ height: 1 }} />
            {isLoading && 
                <div className="loader">
                    <svg viewBox="0 0 980 978.94">
                        <path fill="#2c2c2c" d="M770,1224.85H732c-1.49-1-3.21-.74-4.85-.82-43.27-1.91-85.66-9.09-126.64-23.08-151.15-51.57-254.79-152.44-311.12-301.58-14.9-39.48-23.16-80.65-26.63-122.76-.55-6.76-.06-13.62-1.76-20.28v-43a58.81,58.81,0,0,0,.89-5.86,461,461,0,0,1,17.86-106.37q47-160.89,181.91-260.55C529.06,290.81,604.73,261,687.76,250a479.9,479.9,0,0,1,103.69-2.35c37.6,3.17,74.47,9.93,110.19,22q208.55,70.45,299,271.14c21.87,48.51,34.17,99.72,38.6,152.8.58,6.92.1,13.95,1.8,20.77v42c-.3,2.1-.78,4.2-.88,6.31A464.49,464.49,0,0,1,1222.35,869q-43.32,149.69-164.66,247.69Q941,1210.57,791.31,1223.07C784.21,1223.67,777,1223.05,770,1224.85ZM438.72,766.6h-96c-7.34,0-7.35,0-6.51,7.5a455.59,455.59,0,0,0,7.62,48.7q32.9,148.47,153,241.88c65.33,50.8,139.8,79.07,222.48,85.42,48.25,3.71,96,.07,142.34-13.67,136.22-40.33,229.87-127.25,281-259.63,12.92-33.47,19.88-68.48,23.33-104.17.33-3.46.83-6.17-4.62-6.16q-98,.3-196,0c-3.42,0-4.7,1.17-5.18,4.31-.71,4.59-1.53,9.17-2.63,13.68-27.08,111-135,180.24-247.43,158.68-85.94-16.48-153.58-85.58-168.15-171.85-.58-3.44-1.83-4.87-5.73-4.85C503.71,766.68,471.21,766.6,438.72,766.6Zm165.37-31.32C604.13,815.92,670.26,882,751,882s146.87-66,146.94-146.66S831.91,588.73,751,588.69,604.05,654.66,604.09,735.28Z" transform="translate(-261 -245.91)"/>
                    </svg>
                    <p>Chargement ...</p>
                </div>
            }
        </div>
    );
}

export default Homepage;

