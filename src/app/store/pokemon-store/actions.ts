import { createAction, props } from '@ngrx/store';
import { type Pokemon, PokemonDetail } from '../../definitions/pokemon';

export enum ActionTypes {
  REQUEST_LOADING = 'Pokemon request loading',
  REQUEST_FAILURE = 'Pokemon request failure',
  REQUEST_SUCCESS = 'Pokemon request success',
  REQUEST_DETAIL_LOADING = 'Pokemon detail request loading',
  REQUEST_DETAIL_FAILURE = 'Pokemon detail request failure',
  REQUEST_DETAIL_SUCCESS = 'Pokemon detail request success',
}

export const loadRequest = createAction(ActionTypes.REQUEST_LOADING);

export const failRequest = createAction(
  ActionTypes.REQUEST_FAILURE,
  props<{ error: string }>()
);

export const successRequest = createAction(
  ActionTypes.REQUEST_SUCCESS,
  props<{ pokemons: Pokemon[] }>()
);

export const loadDetailRequest = createAction(
  ActionTypes.REQUEST_DETAIL_LOADING,
  props<{ pokemonName: string }>()
);

export const successDetailRequest = createAction(
  ActionTypes.REQUEST_DETAIL_SUCCESS,
  props<{ pokemon: PokemonDetail }>()
);
