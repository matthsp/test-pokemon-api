import { Pokemon, PokemonDetail } from '../../definitions/pokemon';

export interface PokemonState {
  lastLoadedPageIndex: number | null;
  items: Pokemon[];
  detail: PokemonDetail | null;
  error: string | null;
  isLoading: boolean;
}

export const initialPokemonState: PokemonState = {
  lastLoadedPageIndex: null,
  items: [],
  detail: null,
  error: null,
  isLoading: false,
};
