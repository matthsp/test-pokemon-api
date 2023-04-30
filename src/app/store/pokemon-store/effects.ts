import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { PokemonService } from '../../services/pokemon.service';
import { ActionTypes, failRequest, successRequest } from './actions';

@Injectable()
export class PokemonEffects {
  constructor(
    private readonly actions: Actions,
    private readonly pokemonService: PokemonService
  ) {}

  loadPokemons = createEffect(() => {
    return this.actions.pipe(
      ofType(ActionTypes.REQUEST_LOADING),
      exhaustMap(({ page }) =>
        this.pokemonService.getPokemons(page).pipe(
          map(response => successRequest({ pokemons: response })),
          catchError((error: { message: string }) =>
            of(failRequest({ error: error.message }))
          )
        )
      )
    );
  });
}
