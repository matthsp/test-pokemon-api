import { EvolutionChainLink, PokemonDetail } from '../definitions/pokemon';

export const getFlavorText = (
  pokemonDetail: PokemonDetail,
  localeCode: string
): string => {
  const flavor = pokemonDetail.species.flavor_text_entries.find(
    flavor => flavor.language.name === localeCode
  );
  return flavor?.flavor_text || 'Flavor text not found';
};

export const getEvolution = (pokemon: PokemonDetail): string[] => {
  const currentEvolution = findCurrentEvolution(
    pokemon.species.evolution_chain.chain,
    pokemon.name
  );

  if (currentEvolution === undefined) {
    return [];
  }

  return currentEvolution.evolves_to?.flatMap(({ species }) => species.name);
};

const findCurrentEvolution = (
  chain: EvolutionChainLink,
  name: string
): EvolutionChainLink | undefined => {
  if (chain.species.name === name) {
    return chain;
  }

  for (let i = 0; i < chain.evolves_to.length; i++) {
    const evolution = findCurrentEvolution(chain.evolves_to[i], name);
    if (evolution) {
      return evolution;
    }
  }
  return undefined;
};
