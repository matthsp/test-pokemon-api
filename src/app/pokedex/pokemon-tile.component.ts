import { Attribute, Component, Input } from '@angular/core';
import { Pokemon } from '../definitions/pokemon';

@Component({
  selector: 'pkm-pokemon-tile',
  templateUrl: './pokemon-tile.component.html',
  styleUrls: ['./pokemon-tile.component.sass'],
})
export class PokemonTileComponent {
  @Input() pokemon: Pokemon;

  constructor(@Attribute('pokemon') pokemon: Pokemon) {
    this.pokemon = pokemon;
  }
}
