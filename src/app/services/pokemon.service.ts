import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, switchMap } from 'rxjs';

import { PaginatedAnswer, Pokemon, PokemonLink } from '../definitions/pokemon';

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
}
