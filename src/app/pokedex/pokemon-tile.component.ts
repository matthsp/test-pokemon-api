import { Attribute, Component, Input } from '@angular/core';
import { Pokemon } from '../definitions/pokemon';
import { Router } from '@angular/router';

@Component({
  selector: 'pkm-pokemon-tile',
  templateUrl: './pokemon-tile.component.html',
  styleUrls: [
    '../utils/pokemon-types-colors.sass',
    './pokemon-tile.component.sass',
  ],
})
export class PokemonTileComponent {
  @Input() pokemon: Pokemon;

  constructor(
    @Attribute('pokemon') pokemon: Pokemon,
    private readonly router: Router
  ) {
    this.pokemon = pokemon;
  }

  openDetailPage() {
    this.router.navigate(['pokedex', this.pokemon.name]);
  }
}
