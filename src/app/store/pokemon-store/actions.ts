import { createAction, props } from '@ngrx/store';
import { type Pokemon } from '../../definitions/pokemon';

export enum ActionTypes {
  REQUEST_LOADING = 'Pokemon request loading',
  REQUEST_FAILURE = 'Pokemon request failure',
  REQUEST_SUCCESS = 'Pokemon request success',
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
