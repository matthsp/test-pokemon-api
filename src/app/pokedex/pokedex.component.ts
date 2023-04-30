import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Pokemon } from '../definitions/pokemon';
import { loadRequest } from '../store/pokemon-store/actions';
import {
  selectError,
  selectLoadingState,
  selectPokemons,
} from '../store/pokemon-store/selector';

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
    this.pokemons$ = this.store.select(selectPokemons);
    this.isLoading$ = this.store.select(selectLoadingState);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit() {
    this.store.dispatch(loadRequest({ page: 0 }));
  }
}
