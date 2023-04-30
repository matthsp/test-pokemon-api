import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PokemonState } from './pokemonState';

const selectPokemonFeature = createFeatureSelector<PokemonState>('pokemons');

export const selectPokemons = createSelector(
  selectPokemonFeature,
  (state: PokemonState) => state.items
);

export const selectLoadingState = createSelector(
  selectPokemonFeature,
  (state: PokemonState) => state.isLoading
);

export const selectError = createSelector(
  selectPokemonFeature,
  (state: PokemonState) => state.error
);
