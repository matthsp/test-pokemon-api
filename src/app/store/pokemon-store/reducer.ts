import { createReducer, on } from '@ngrx/store';
import { failRequest, loadRequest, successRequest } from './actions';
import { initialPokemonState, PokemonState } from './pokemonState';

export const pokemonReducer = createReducer(
  initialPokemonState,
  on(loadRequest, (state): PokemonState => ({ ...state, isLoading: true })),
  on(
    failRequest,
    (state, { error }): PokemonState => ({ ...state, isLoading: false, error })
  ),
  on(
    successRequest,
    (state, { pokemons }): PokemonState => ({
      ...state,
      items: [...state.items, ...pokemons],
      isLoading: false,
      lastLoadedPageIndex:
        state.lastLoadedPageIndex !== null ? state.lastLoadedPageIndex + 1 : 0,
    })
  )
);
