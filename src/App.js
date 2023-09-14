import { useState, useEffect, useMemo } from "react";
import { pokemonData } from "./data/pokemon";

const PokemonList = () => {
  /* 
    instruction: set up the following states
    - pokemons: array of pokemons. use pokemonData as initial value
    - searchTerm: search term for pokemon's name
    - sort: sort by title or rating
  */
  const [pokemon, setPokemon] = useState(pokemonData);
  const [sort, setSort] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const types = useMemo(() => {
    let options = [];
    if (pokemon && pokemon.length > 0) {
      pokemon.forEach((poke) => {
        if (!options.includes(poke.type)) {
          options.push(poke.type);
        }
      });
    }

    return options;
  }, [pokemonData]);

  useEffect(() => {
    let newPokemons = [...pokemonData];

    // instruction: do title search using the searchTerm state
    if (searchTerm !== "") {
      newPokemons = newPokemons.filter((poke) =>
        poke.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // instruction: do type filter using the selectedType state
    if (selectedType !== "") {
      newPokemons = newPokemons.filter((poke) =>
        poke.type.includes(selectedType)
      );
    }
    // instruction: sort by name or level
    switch (sort) {
      case "name":
        newPokemons = newPokemons.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        break;
      case "level":
        newPokemons = newPokemons.sort((a, b) => {
          return a.level - b.level;
        });
        break;
    }

    // instruction: set pokemons state with newPokemons variable
    setPokemon(newPokemons);
  }, [pokemonData, selectedType, sort, searchTerm]);

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-6">
          <input
            type="text"
            placeholder="Search"
            // instruction: assign searchTerm state to value
            value={searchTerm}
            onChange={(e) => {
              // instruction: set searchTerm state
              setSearchTerm(e.target.value);
            }}
          />
        </div>
        <div className="col-6 text-end mb-3">
          <select
            className="me-1 mb-1"
            // instruction: assign sort state to value
            value={sort}
            onChange={(e) => {
              // instruction: set sort state
              setSort(e.target.value);
            }}>
            <option value="name">Sort by Name</option>
            <option value="level">Sort by Level</option>
          </select>

          <select
            className="me-1 mb-1"
            // instruction: assign selectedType state to value
            value={selectedType}
            onChange={(e) => {
              // instruction: set selectedType state
              setSelectedType(e.target.value);
            }}>
            <option value="">All Types</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* 
        instruction: 
        - display the pokemons here
        - responsive layout: 1 column for mobile, 2 columns for tablet, 3 columns for desktop
      */}
      <div className="row">
        {pokemon.map((poke) => (
          <div key={poke.name} className="col-lg-4 col-md-6 col-sm-12 mb-5">
            <div className="card">
              <div className="card-title">
                <h1>{poke.name}</h1>
              </div>
              <div className="card-text">
                <strong>{poke.type}</strong>
                <p>{poke.level}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
