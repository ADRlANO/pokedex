import { PokemonClient } from "pokenode-ts";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

const api = new PokemonClient();

const QUERY_KEYS = {
  POKEMON_LIST: 'pokemonList',
  INFINITE_POKEMON_LIST: 'infinitePokemonList',
};

async function transformPokemonResponse(pokeApiResponse) {
  let pokemonResponse = []
  for(let pokemon of pokeApiResponse) {
    const pokemonData = await api.getPokemonByName(pokemon.name)
    pokemonResponse = [...pokemonResponse, pokemonData];
  }

  return pokemonResponse;
};

export function usePokemonList() {
  const OFFSET = 0;
  const LIMIT = 649;

  return useQuery([QUERY_KEYS.POKEMON_LIST], async () => {
    const pokeApiResponse = await api.listPokemons(OFFSET, LIMIT)
    return await transformPokemonResponse(pokeApiResponse.results);
  })
};

const fetchPokemon = async ({
  pageParam = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20',
}) => {
  const request = await fetch(pageParam);
  const { results, next } = await request.json();
  const transformedPokemonResponse = await transformPokemonResponse(results);

  return { response: transformedPokemonResponse, nextPage: next };
};

export const useInfinitePokemonList = () => {
  return useInfiniteQuery([QUERY_KEYS.INFINITE_POKEMON_LIST], fetchPokemon, {
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};
