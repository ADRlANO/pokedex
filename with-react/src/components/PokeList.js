import React from "react";

import { PokemonCard } from "./PokemonCard";
import { usePokemonList } from "../service/queries";

import "./PokeList.css";

export const PokeList = () => {
  const { data: pokemonList } = usePokemonList();

  if (!pokemonList) {
    return 'loading...';
  }

  return (
    <div className="app-container">
      <div className="pokemon-container">
        <div className="all-container">
          {pokemonList.map((pokemonStats) => (
            <PokemonCard
              key={pokemonStats.name}
              id={pokemonStats.id.toString().padStart(3, "0")}
              image={
                pokemonStats.sprites.other["official-artwork"].front_default
              }
              name={pokemonStats.name.replace(/^./, (str) => str.toUpperCase())}
              type={pokemonStats.types[0].type.name}
              weight={pokemonStats.weight}
              height={pokemonStats.height}
              stats={pokemonStats.stats
                .map((stat) => stat.base_stat)
                .slice(0, 3)
              }
              statsName={pokemonStats.stats
                .map((stat) => stat.stat.name)
                .slice(0, 3)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};
