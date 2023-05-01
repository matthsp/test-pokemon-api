import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  combineLatest,
  concatMap,
  forkJoin,
  type Observable,
  switchMap,
} from 'rxjs';
import { map } from 'rxjs/operators';

import {
  EvolutionChain,
  PaginatedAnswer,
  Pokemon,
  PokemonDetail,
  PokemonLink,
  PokemonSpecies,
} from '../definitions/pokemon';
import { mergeToPokemon } from '../utils/pokemon-species-evolution-chain.mapper';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private readonly http: HttpClient) {}

  getPokemons(page: number): Observable<Pokemon[]> {
    return this.http
      .get<PaginatedAnswer<PokemonLink>>(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page * 20}`
      )
      .pipe(
        switchMap(({ results }) => {
          return forkJoin(results.map(pokemon => this.getPokemon(pokemon.url)));
        })
      );
  }

  private getPokemon(url: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(url);
  }

  private getSpecies(url: string): Observable<PokemonSpecies> {
    return this.http.get<PokemonSpecies>(url);
  }

  getPokemonDetails(name: string): Observable<PokemonDetail> {
    const pokemon$ = this.getPokemon(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    const species$ = this.getSpecies(
      `https://pokeapi.co/api/v2/pokemon-species/${name}`
    );

    return combineLatest([species$, pokemon$]).pipe(
      concatMap(([species, pokemon]) =>
        this.mergeWithEvolutionChain(species, pokemon)
      )
    );
  }

  private mergeWithEvolutionChain(
    species: PokemonSpecies,
    pokemon: Pokemon
  ): Observable<PokemonDetail> {
    return this.http
      .get<EvolutionChain>(species.evolution_chain.url)
      .pipe(
        map(evolutionChain => mergeToPokemon(pokemon, species, evolutionChain))
      );
  }
}
