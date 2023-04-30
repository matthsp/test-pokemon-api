export interface PokemonLink {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
}

export interface PaginatedAnswer<T> {
  count: number;
  results: T[];
}
