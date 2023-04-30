import { PokemonNumberPipe } from './pokemon-number.pipe';

describe('pokemonNumber Pipe', () => {
  let pokemonNumberPipe: PokemonNumberPipe;

  beforeAll(() => {
    pokemonNumberPipe = new PokemonNumberPipe();
  });

  it('should add leading 0 and return the number formatted', () => {
    const result = pokemonNumberPipe.transform(2);

    expect(result).toBe('#0002');
  });

  it(`should only add the leading '#' when the number is big enough`, () => {
    const result = pokemonNumberPipe.transform(1234);

    expect(result).toBe('#1234');
  });
});
