import { Pokemon } from '../../definitions/pokemon';

export interface PokemonState {
  lastLoadedPageIndex: number | null;
  items: Pokemon[];
  error: string | null;
  isLoading: boolean;
}

export const initialPokemonState: PokemonState = {
  lastLoadedPageIndex: null,
  items: [],
  error: null,
  isLoading: false,
};
