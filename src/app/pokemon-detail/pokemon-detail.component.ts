import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { PokemonDetail } from '../definitions/pokemon';
import { loadDetailRequest } from '../store/pokemon-store/actions';
import { fromPokemon } from '../store/pokemon-store/selector';
import { getEvolution, getFlavorText } from '../utils/pokemon-detail.utils';

@Component({
  selector: 'pkm-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: [
    '../utils/pokemon-types-colors.sass',
    './pokemon-detail.component.sass',
  ],
})
export class PokemondDetailComponent {
  detail$: Observable<PokemonDetail | null>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {
    this.detail$ = this.store.select(fromPokemon.selectPokemonDetail);
    this.isLoading$ = this.store.select(fromPokemon.selectLoadingState);
    this.error$ = this.store.select(fromPokemon.selectError);

    this.activatedRoute.paramMap.subscribe(params => {
      const name = params.get('name');
      if (name === null) {
        this.router.navigate(['404']);
        return;
      }
      this.store.dispatch(loadDetailRequest({ pokemonName: name }));
    });
  }

  protected readonly getFlavorText = getFlavorText;
  protected readonly getEvolution = getEvolution;

  goBack() {
    this.router.navigate(['..']);
  }
}
