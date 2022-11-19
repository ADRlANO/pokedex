import { useQuery } from "@tanstack/react-query"
import { PokemonClient } from "pokenode-ts";

const api = new PokemonClient();

const QUERY_KEYS = {
  POKEMON_LIST: 'pokemonList'
};

async function transformPokemonResponse({ results: pokeApiResponse }) {
  let pokemonResponse = []
  for(let pokemon of pokeApiResponse) {
    const pokemonData = await api.getPokemonByName(pokemon.name)
    pokemonResponse = [...pokemonResponse, pokemonData];
  }

  return pokemonResponse;
}

export function usePokemonList() {
  const OFFSET = 0;
  const LIMIT = 649;

  return useQuery([QUERY_KEYS.POKEMON_LIST], async () => {
    const pokeApiResponse = await api.listPokemons(OFFSET, LIMIT)
    return await transformPokemonResponse(pokeApiResponse);
  })
}
