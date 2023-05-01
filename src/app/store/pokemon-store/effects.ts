import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { PokemonService } from '../../services/pokemon.service';
import {
  ActionTypes,
  failRequest,
  loadDetailRequest,
  successDetailRequest,
  successRequest,
} from './actions';
import { fromPokemon } from './selector';

@Injectable()
export class PokemonEffects {
  constructor(
    private readonly actions: Actions,
    private readonly pokemonService: PokemonService,
    private readonly store: Store
  ) {}

  loadPokemons = createEffect(() => {
    return this.actions.pipe(
      ofType(ActionTypes.REQUEST_LOADING),
      concatLatestFrom(() => this.store.select(fromPokemon.selectState)),
      exhaustMap(results =>
        this.pokemonService
          .getPokemons(results[1].index !== null ? results[1].index + 1 : 0)
          .pipe(
            map(response => successRequest({ pokemons: response })),
            catchError((error: { message: string }) =>
              of(failRequest({ error: error.message }))
            )
          )
      )
    );
  });

  loadDetailPokemon = createEffect(() => {
    return this.actions.pipe(
      ofType(loadDetailRequest),
      exhaustMap(({ pokemonName }) =>
        this.pokemonService.getPokemonDetails(pokemonName).pipe(
          map(response => successDetailRequest({ pokemon: response })),
          catchError((error: { message: string }) =>
            of(failRequest({ error: error.message }))
          )
        )
      )
    );
  });
}
