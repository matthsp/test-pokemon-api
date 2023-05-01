import {
  EvolutionChain,
  Pokemon,
  PokemonDetail,
  PokemonSpecies,
} from '../definitions/pokemon';

export const mergeToPokemon = (
  pokemon: Pokemon,
  species: PokemonSpecies,
  evolutionChain: EvolutionChain
): PokemonDetail => {
  return {
    ...pokemon,
    species: {
      ...pokemon.species,
      ...species,
      evolution_chain: evolutionChain,
    },
  };
};
