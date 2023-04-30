import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PokemonState } from './pokemonState';

const selectPokemonFeature = createFeatureSelector<PokemonState>('pokemons');

const selectState = createSelector(
  selectPokemonFeature,
  (state: PokemonState) => ({
    index: state.lastLoadedPageIndex,
    isLoading: state.isLoading,
  })
);

const selectPokemons = createSelector(
  selectPokemonFeature,
  (state: PokemonState) => state.items
);

const selectLoadingState = createSelector(
  selectPokemonFeature,
  (state: PokemonState) => state.isLoading
);

const selectError = createSelector(
  selectPokemonFeature,
  (state: PokemonState) => state.error
);

export const fromPokemon = {
  selectError,
  selectLoadingState,
  selectPokemons,
  selectState,
};
