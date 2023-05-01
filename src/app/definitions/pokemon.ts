export interface PokemonDetail extends Omit<Pokemon, 'species'> {
  species: PokemonDetailSpecies;
}

export interface PokemonDetailSpecies
  extends Omit<PokemonSpecies, 'evolution_chain'> {
  name: string;
  url: string;
  evolution_chain: EvolutionChain;
}

export interface PokemonSpecies {
  id: number;
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
  }[];
  evolution_chain: { url: string };
}

export interface EvolutionChain {
  id: number;
  chain: EvolutionChainLink;
}

export interface EvolutionChainLink {
  id: number;
  evolves_to: EvolutionChainLink[];
  species: {
    name: string;
  };
}

export interface PokemonLink {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': { front_default: string };
    };
  };
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
  species: {
    name: string;
    url: string;
  };
}

export interface PaginatedAnswer<T> {
  count: number;
  results: T[];
}
