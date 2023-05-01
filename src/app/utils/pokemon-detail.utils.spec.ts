import { getEvolution, getFlavorText } from './pokemon-detail.utils';
import {
  EvolutionChainLink,
  PokemonDetail,
  PokemonDetailSpecies,
} from '../definitions/pokemon';

describe('PokemonUtils', () => {
  describe('getFlavorText', () => {
    it('should return properly the flavor', () => {
      const pokemon = {
        species: {
          flavor_text_entries: [
            { flavor_text: 'Hola quetal', language: { name: 'es' } },
            { flavor_text: 'Much flavor, such wow', language: { name: 'en' } },
          ],
        } as unknown as PokemonDetailSpecies,
      } as PokemonDetail;
      const result = getFlavorText(pokemon, 'en');

      expect(result).toBe('Much flavor, such wow');
    });

    it('should return properly the flavor', () => {
      const pokemon = {
        species: { flavor_text_entries: [] } as unknown as PokemonDetailSpecies,
      } as PokemonDetail;
      const result = getFlavorText(pokemon, 'en');

      expect(result).toBe('Flavor text not found');
    });
  });

  describe('getPokemonEvolution', () => {
    it('should return an evolution when there is one', () => {
      const pokemon = {
        name: 'missingNo',
        species: {
          evolution_chain: {
            chain: {
              evolves_to: [
                {
                  id: 1,
                  evolves_to: [],
                  species: { name: 'foundNo' },
                } as EvolutionChainLink,
              ],
              species: {
                name: 'missingNo',
              },
            },
          },
        },
      } as PokemonDetail;

      const result = getEvolution(pokemon);

      expect(result).toStrictEqual(['foundNo']);
    });

    it('should return an empty array otherwise', () => {
      const pokemon = {
        name: 'missingNo',
        species: {
          evolution_chain: {
            chain: {
              evolves_to: [],
              species: {
                name: 'missingNo',
              },
            },
          },
        },
      } as unknown as PokemonDetail;

      const result = getEvolution(pokemon);

      expect(result).toHaveLength(0);
    });
  });
});
