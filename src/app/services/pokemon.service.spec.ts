import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import {
  EvolutionChain,
  Pokemon,
  PokemonLink,
  PokemonSpecies,
} from '../definitions/pokemon';
import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let controller: HttpTestingController;
  let service: PokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService],
    });

    controller = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPokemons', () => {
    it('should call pokeapi to get the detail for the list of pokemons', () => {
      service.getPokemons(0).subscribe(value => {
        expect(value).toBe([
          { name: 'bulba' } as Pokemon,
          { name: 'ivy' } as Pokemon,
        ]);
      });

      const mainRequest = controller.expectOne(
        'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
      );
      // Answer the request so the Observable emits a value.
      mainRequest.flush({
        count: 2,
        results: [
          { url: 'url-1' } as PokemonLink,
          { url: 'url-2' } as PokemonLink,
        ],
      });

      const secondRequest = controller.expectOne('url-1');
      // Answer the request so the Observable emits a value.
      secondRequest.flush({ name: 'bulba' } as Pokemon);

      const thirdRequest = controller.expectOne('url-2');
      // Answer the request so the Observable emits a value.
      thirdRequest.flush({ name: 'ivy' } as Pokemon);
    });
  });

  describe('getPokemonDetails', () => {
    it('should return the aggregated values from the 3 api calls', () => {
      service.getPokemonDetails('missingNo').subscribe(value => {
        expect(value).toStrictEqual({
          name: 'missingNo42',
          species: {
            id: 12,
            name: 'missingNo',
            url: 'url-missing',
            evolution_chain: {
              id: 15,
              chain: { species: { name: 'missingNo' } },
            },
          },
        });
      });

      const mainRequest = controller.expectOne(
        'https://pokeapi.co/api/v2/pokemon/missingNo'
      );
      // Answer the request so the Observable emits a value.
      mainRequest.flush({
        name: 'missingNo42',
        species: { name: 'missingNo', url: 'url-missing' },
      } as Pokemon);

      const secondRequest = controller.expectOne(
        'https://pokeapi.co/api/v2/pokemon-species/missingNo'
      );
      // Answer the request so the Observable emits a value.
      secondRequest.flush({
        id: 12,
        evolution_chain: { url: 'url-evol' },
      } as PokemonSpecies);

      const thirdRequest = controller.expectOne('url-evol');
      // Answer the request so the Observable emits a value.
      thirdRequest.flush({
        id: 15,
        chain: { species: { name: 'missingNo' } },
      } as EvolutionChain);
    });
  });
});
