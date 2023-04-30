import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Pokemon } from '../definitions/pokemon';
import { loadRequest } from '../store/pokemon-store/actions';
import { fromPokemon } from '../store/pokemon-store/selector';

@Component({
  selector: 'pkm-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.sass'],
})
export class PokedexComponent implements OnInit {
  pokemons$: Observable<Pokemon[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store) {
    this.pokemons$ = this.store.select(fromPokemon.selectPokemons);
    this.isLoading$ = this.store.select(fromPokemon.selectLoadingState);
    this.error$ = this.store.select(fromPokemon.selectError);
  }

  ngOnInit() {
    this.store.dispatch(loadRequest());
  }

  loadMore() {
    this.store.dispatch(loadRequest());
  }
}
