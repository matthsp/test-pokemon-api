import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokedexComponent } from './pokedex.component';
import { PokemonTileComponent } from './pokemon-tile.component';
import { PokemonNumberPipe } from './pipes/pokemon-number.pipe';

@NgModule({
  declarations: [PokedexComponent, PokemonTileComponent, PokemonNumberPipe],
  imports: [CommonModule],
  exports: [PokemonNumberPipe],
})
export class PokedexModule {}
