import React, { useEffect } from "react";
import { useInView } from 'react-intersection-observer';

import { PokemonCard } from "./PokemonCard";
import { useInfinitePokemonList } from "../service/queries";

import "./PokeList.css";

export const PokeList = () => {
  const { ref, inView } = useInView();
  const {
    data: pokemonList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfinitePokemonList();

  const allPokemon = pokemonList?.pages?.reduce(
    (previousValue, currentValue) => {
      return [...previousValue, ...currentValue.response]
    }, []
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (!pokemonList) {
    return (
      <div className="app-container">
        <div className="pokemon-container">
            {'Loading Pokemon...'}
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemon.map((pokemonStats) => (
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
          <button
            ref={ref}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? 'Loading Pokemon...'
              : hasNextPage
              ? 'Load More'
              : 'All Pokemon have been loaded'
            }
          </button>
        </div>
      </div>
    </div>
  );
};
