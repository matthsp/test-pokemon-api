import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemondDetailComponent } from './pokemon-detail.component';
import { PokedexModule } from '../pokedex/pokedex.module';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [PokemondDetailComponent],
  imports: [CommonModule, PokedexModule, RouterLink],
})
export class PokemonDetailModule {}
