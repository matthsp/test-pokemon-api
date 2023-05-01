import {
  EvolutionChain,
  Pokemon,
  PokemonSpecies,
} from '../definitions/pokemon';
import { mergeToPokemon } from './pokemon-species-evolution-chain.mapper';

describe('mergeToPokemon', () => {
  it('should return the pokemon object mapped properly', () => {
    const pokemon = {
      id: 12,
      species: { name: 'ivysaur', url: 'url-ivy' },
    } as Pokemon;

    const species = {
      id: 12,
      evolution_chain: { url: 'uri-species' },
    } as PokemonSpecies;

    const evolutionChain = {
      id: 42,
      chain: {
        species: {
          name: 'venusaur',
        },
      },
    } as EvolutionChain;

    const result = mergeToPokemon(pokemon, species, evolutionChain);
    expect(result).toStrictEqual({
      id: 12,
      species: {
        name: 'ivysaur',
        url: 'url-ivy',
        id: 12,
        evolution_chain: {
          id: 42,
          chain: {
            species: {
              name: 'venusaur',
            },
          },
        },
      },
    });
  });
});
